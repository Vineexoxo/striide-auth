class UserPayload {
    constructor(email, city, state, occupation, gender, birthdate, phoneNumber, transportModes, commuteFrequency, travelTime, feedType) {
      this.email = email;
      this.userInfo = {
        city: city,
        state: state,
        occupation: occupation,
        gender: gender,
        birthdate: birthdate,
        phoneNumber: phoneNumber,
        transportModes: transportModes,
        commuteFrequency: commuteFrequency,
        travelTime: travelTime,
        feedType: feedType,
      };
    }
  
    // Method to get the ready-for-submission payload
    getPayload() {
      return {
        email: this.email,
        user_info: this.userInfo,
      };
    }
  
    // Method to update user info
    updateUserInfo(key, value) {
      if (this.userInfo.hasOwnProperty(key)) {
        this.userInfo[key] = value;
      } else {
        throw new Error(`Key "${key}" does not exist in userInfo`);
      }
    }
  
    // Method to update email
    updateEmail(newEmail) {
      this.email = newEmail;
    }
  }
  
  // Example usage:
  const user = new UserPayload(
    "sda@afalmk.com",
    "Bangalore",
    "Karnataka",
    "da",
    "Female",
    "2025-01-31T00:00:00Z",
    "",
    ["Driving", "Biking", "Walking", "PublicTransport"],
    "Monthly",
    "Afternoon",
    "Other"
  );
  
  // Retrieve the payload
  console.log(user.getPayload());
  
  // Update user info
  user.updateUserInfo("city", "Mumbai");
  console.log(user.getPayload());
  