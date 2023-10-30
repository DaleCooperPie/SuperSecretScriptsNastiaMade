javascript:(function() {
    // Replace with your JSON data, where keys represent the input field order and values are the data to fill
    var formData = {
      1: "Registration Number Value",
      2: "Postcode Value",
      // 3: "Registration Number Value", // Optional
      // 4: "Postcode Value", // Optional
      // 5: "Registration Number Value", // Optional
      // 6: "Postcode Value", // Optional
      // 7: "Registration Number Value", // Optional
      // 8: "Postcode Value", // Optional
      // 9: "Registration Number Value", // Optional
      // 10: "Postcode Value", // Optional
      // 11: "Registration Number Value", // Optional
      // 12: "Postcode Value" // Optional
    };

    var index = 1;

    function fillFormField() {
      var fieldValue = formData[index];
      if (fieldValue !== undefined) {
        var inputField = document.getElementsByTagName("input")[index - 1];
        if (inputField) {
          inputField.value = fieldValue;
        }
        index++;
        setTimeout(fillFormField, 100); // Adjust the delay as needed
      }
    }

    fillFormField();
  })();
