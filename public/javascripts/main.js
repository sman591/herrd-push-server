$('.players').each(function() {
  var container = this;
  var api_key = $(container).data('api-key');
  $.ajax('/api/players?api_key=' + api_key)
    .done(function(data) {
      $(container).html('');
      if (data.total_count < 1) {
        $(container).append('No players.');
      }
      data.players.forEach(function(entry) {
        var $element = $('<li></li>');
        $element.append('ID: <code>' + entry.id + '</code>');
        $element.append('<pre>' + JSON.stringify(entry) + '</pre>');
        $(container).append($element);
      });
    })
    .fail(function() {
      $(container).html('Failed to load players.');
    });
});
