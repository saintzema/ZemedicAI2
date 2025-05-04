
import requests
import sys
import uuid
import base64
from datetime import datetime

class ZemedicAITester:
    def __init__(self, base_url="https://3fe756b7-c791-4c34-9728-c1fef49774cc.preview.emergentagent.com/api"):
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
        # Use direct request with form data
        url = f"{self.base_url}/token"
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        data = {"username": self.user_email, "password": self.user_password}
        
        try:
            self.tests_run += 1
            print(f"\n🔍 Testing User Login...")
            
            response = requests.post(url, data=data, headers=headers)
            
            if response.status_code == 200:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                response_data = response.json()
                self.token = response_data.get('access_token')
                return True, response_data
            else:
                print(f"❌ Failed - Expected 200, got {response.status_code}")
                try:
                    print(f"Response: {response.json()}")
                except:
                    print(f"Response: {response.text}")
                return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

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
        # Use direct request with form data
        url = f"{self.base_url}/token"
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        data = {"username": email, "password": password}
        
        try:
            self.tests_run += 1
            print(f"\n🔍 Testing Login with {email}...")
            
            response = requests.post(url, data=data, headers=headers)
            
            if response.status_code == 200:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                response_data = response.json()
                self.token = response_data.get('access_token')
                return True, response_data
            else:
                print(f"❌ Failed - Expected 200, got {response.status_code}")
                try:
                    print(f"Response: {response.json()}")
                except:
                    print(f"Response: {response.text}")
                return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}
            
    def test_google_health_api(self):
        """Test the Google Health API integration"""
        if not self.token:
            print("❌ Skipping Google Health API test - No authentication token")
            return False, {}
            
        # Create a mock image data (base64 encoded string)
        # In a real test, this would be an actual medical image
        mock_image_data = base64.b64encode(b"mock_image_data").decode('utf-8')
        
        data = {
            "image_type": "xray",
            "image_data": mock_image_data
        }
        
        return self.run_test(
            "Google Health API Integration",
            "POST",
            "google-health/analyze",
            200,
            data=data
        )

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
            # Test Google Health API integration
            tester.test_google_health_api()
        
        # Also test registration and login with new user
        register_success, _ = tester.test_register_user()
        
        if register_success:
            login_success, _ = tester.test_login()
            
            if login_success:
                tester.test_get_user_profile()
                # Test Google Health API integration with new user
                tester.test_google_health_api()
    
    # Print results
    print(f"\n📊 Tests Summary: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    # Return success if all tests passed
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())
