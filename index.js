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

function displayResults(data) {
  $('#results').html("");
  data.items.map(obj => {
    $('#results').append(`<div>
      <h2><a href="${obj.html_url}"${obj.name}</a></h2>
      <p><img src= "${obj.owner.avatar_url}" alt="User Image"></p>
      <p><a href='#' data-repository="${obj.name}" data-owner="${obj.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
      <p> <li>${obj.description}</p>
      </div>
      `)
  })
}
