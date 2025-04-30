
import requests
import sys
import uuid
from datetime import datetime

class ZemedicAITester:
    def __init__(self, base_url="https://b8f774b4-d606-46d0-bc66-bfa35c307be1.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.user_email = None
        self.user_password = None

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        
        if headers is None:
            headers = {'Content-Type': 'application/json'}
        
        if self.token and 'Authorization' not in headers:
            headers['Authorization'] = f'Bearer {self.token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            
            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return success, response.json()
                except:
                    return success, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    print(f"Response: {response.json()}")
                except:
                    print(f"Response: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test the health check endpoint"""
        return self.run_test(
            "Health Check",
            "GET",
            "health",
            200
        )

    def test_register_user(self):
        """Test user registration"""
        # Generate unique email to avoid conflicts
        unique_id = uuid.uuid4().hex[:8]
        self.user_email = f"test_user_{unique_id}@example.com"
        self.user_password = "TestPassword123!"
        
        data = {
            "email": self.user_email,
            "password": self.user_password,
            "first_name": "Test",
            "last_name": "User",
            "role": "patient"
        }
        
        return self.run_test(
            "User Registration",
            "POST",
            "users",
            200,
            data=data
        )

    def test_login(self):
        """Test login functionality"""
        # Use URLSearchParams format for login
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        data = f"username={self.user_email}&password={self.user_password}"
        
        success, response = self.run_test(
            "User Login",
            "POST",
            "token",
            200,
            data=None,
            headers=headers
        )
        
        # Make a direct request since we need to send form data
        if not success:
            url = f"{self.base_url}/token"
            try:
                response = requests.post(
                    url, 
                    data=data,
                    headers=headers
                )
                
                if response.status_code == 200:
                    self.tests_passed += 1
                    print(f"✅ Passed - Status: {response.status_code}")
                    response_data = response.json()
                    self.token = response_data.get('access_token')
                    return True, response_data
                else:
                    print(f"❌ Failed - Expected 200, got {response.status_code}")
                    print(f"Response: {response.text}")
                    return False, {}
            except Exception as e:
                print(f"❌ Failed - Error: {str(e)}")
                return False, {}
        
        self.token = response.get('access_token')
        return success, response

    def test_get_user_profile(self):
        """Test getting user profile"""
        if not self.token:
            print("❌ Skipping user profile test - No authentication token")
            return False, {}
            
        return self.run_test(
            "Get User Profile",
            "GET",
            "users/me",
            200
        )

    def test_login_with_credentials(self, email, password):
        """Test login with specific credentials"""
        # Use URLSearchParams format for login
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        data = f"username={email}&password={password}"
        
        success, response = self.run_test(
            f"Login with {email}",
            "POST",
            "token",
            200,
            data=None,
            headers=headers
        )
        
        # Make a direct request since we need to send form data
        if not success:
            url = f"{self.base_url}/token"
            try:
                response = requests.post(
                    url, 
                    data=data,
                    headers=headers
                )
                
                if response.status_code == 200:
                    self.tests_passed += 1
                    print(f"✅ Passed - Status: {response.status_code}")
                    response_data = response.json()
                    self.token = response_data.get('access_token')
                    return True, response_data
                else:
                    print(f"❌ Failed - Expected 200, got {response.status_code}")
                    print(f"Response: {response.text}")
                    return False, {}
            except Exception as e:
                print(f"❌ Failed - Error: {str(e)}")
                return False, {}
        
        self.token = response.get('access_token')
        return success, response

def main():
    # Setup
    tester = ZemedicAITester()
    
    # Run tests
    health_success, _ = tester.test_health_check()
    
    # Test with provided test credentials
    if health_success:
        print("\n🔍 Testing with provided test credentials...")
        login_success, _ = tester.test_login_with_credentials("newtest@example.com", "testpassword")
        
        if login_success:
            tester.test_get_user_profile()
        
        # Also test registration and login with new user
        register_success, _ = tester.test_register_user()
        
        if register_success:
            login_success, _ = tester.test_login()
            
            if login_success:
                tester.test_get_user_profile()
    
    # Print results
    print(f"\n📊 Tests Summary: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    # Return success if all tests passed
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())
