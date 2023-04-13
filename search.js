$(document).ready(function() {
	// Load index from local storage or create a new one
	var index = lunr.Index.load(localStorage.getItem('search-index') || '{}');

	// Handle form submit to add new page to index
	$('#add-page-form').submit(function(event) {
		event.preventDefault();
		var title = $('#title-input').val();
		var content = $('#content-input').val();
		var id = new Date().getTime().toString();
		index.add({
			id: id,
			title: title,
			content: content
		});
		localStorage.setItem('search-index', JSON.stringify(index));
		$(this).get(0).reset();
		alert('Page added to search index.');
	});

	// Handle search box input
	$('#search-box').on('input', function() {
		var query = $(this).val();
		var results = index.search(query);
		var resultsHtml = '';
		for (var i = 0; i < results.length; i++) {
			var result = results[i];
			var item = getItemById(result.ref);
			resultsHtml += '<div><h3>' + item.title + '</h3><p>' + item.content + '</p></div>';
		}
		$('#results').html(resultsHtml);
	});

	// Helper function to get item by ID
	function getItemById(id) {
		// Look up the item by ID in the index
		return index.get(id);
	}
});
