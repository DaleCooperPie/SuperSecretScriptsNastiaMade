javascript: (function () {
  var jsonInput = {
    dropdownOrdering: ["London", "Bristol", "Reading"],
    triggerText: 'TODO fill with glasto page text after which we start searching',
  };

  function selectPrioritisedOption(optionsStartIndex, dropdown) {
    while (optionsStartIndex < jsonInput.dropdownOrdering.length) {
      var optionToFind = jsonInput.dropdownOrdering[optionsStartIndex];

      for (var i = 0; i < dropdown.options.length; i++) {
        if (optionToFind === dropdown.options[i].value) {
          dropdown.options[i].selected = true;
          return optionsStartIndex;
        }
      }
      optionsStartIndex++;
    }
    return optionsStartIndex;
  }

  function shouldEndExecution(dropdown) {
    var prioritisedOptions = jsonInput.dropdownOrdering;

    for (var i = 0; i < dropdown.options.length; i++) {
      if (!prioritisedOptions.includes(dropdown.options[i].value)) {
        return false;
      }
    }
    return true;
  }

  function selectNonPrioritisedOption(dropdown) {
    var prioritisedOptions = jsonInput.dropdownOrdering;

    for (var i = 0; i < dropdown.options.length; i++) {
      if (!prioritisedOptions.includes(dropdown.options[i].value)) {
        dropdown.options[i].selected = true;
        return dropdown.options[i].value;
      }
    }
  }

  function iterateThroughDropdownOptionsRecursive(
    optionsStartIndex,
    dropdown,
    exhaustedOrdering = false
  ) {

    if (!exhaustedOrdering) {
      optionsStartIndex = selectPrioritisedOption(optionsStartIndex, dropdown);
      if(optionsStartIndex === jsonInput.dropdownOrdering.length) {
        exhaustedOrdering = true;
      }
    }

    var option;
    if (exhaustedOrdering) {
      option = selectNonPrioritisedOption(dropdown);
    }

    // main body script

    // Step 4: Wait for the page to reload (simulate a reload)
    setTimeout(function () {
      // Step 5: Inspect the content after the page reload
      var contentAfterReload = dropdown.nextAll();

      if (contentAfterReload) {
        // Step 6: Check if there's another dropdown
        var nestedDropdown = contentAfterReload.querySelector("select");

        if (nestedDropdown) {
          // Step 7: Select any available option from the nested dropdown
          nestedDropdown.options[0].selected = true;
          // Stop the recursion, we found our tickets!!!
          return;
        } else {
          // Step 8: If no nested dropdown, call the recursive method to find a new option to select at the original dropdown

          // Recursion end condition
          if (exhaustedOrdering && shouldEndExecution(dropdown)) {
            return;
          }

          if (exhaustedOrdering) {
            jsonInput.dropdownOrdering.push(option);
          }

          iterateThroughDropdownOptionsRecursive(
            optionsStartIndex++,
            dropdown,
            exhaustedOrdering
          );
        }
      }
    }, 2000); // Adjust the delay as needed
  }

  function findNonEmptySubDropdown() {
    // Step 1: Find the text element that triggers the form filling process
    var textElement = document.querySelector(
      '*:contains("' + jsonInput.triggerText + '")'
    );

    if (textElement) {
      var domAfterText = textElement.nextAll();
      // TODO verify jQuery
      var dropdown = domAfterText.querySelector("select");

      if (dropdown) {
        iterateThroughDropdownOptionsRecursive(0, dropdown, false);
      }
    }
  }

  // Start finding process
  findNonEmptySubDropdown();
})();
