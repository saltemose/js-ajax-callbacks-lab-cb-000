$(document).ready(function (){
});

function searchRepositories() {
  const searchTerms = $(`#searchTerms`).val()
  $.ajax({
    type: 'GET',
    url: `https://api.github.com/search/repositories?q=${searchTerms}`,
    success: function(data) {
      const $data = $(`data`);
      console.log('success', data);
      displayResults(data);
    }
  });
}
