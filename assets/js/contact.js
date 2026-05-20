waitForElement('#title_contact', function(element) {
    setTimeout(function() {
        element.classList.add("active");
        console.log("Element found and class added after 2 seconds");
    }, 100);
});