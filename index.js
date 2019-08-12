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
      <h2><a href="${obj.html_url}">${obj.name}</a></h2>
      <p><img src= "${obj.owner.avatar_url}" alt="User Image"></p>
      <p><a href='#' data-repository="${obj.name}" data-owner="${obj.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
      <p> <li>${obj.description}</p>
      </div>
      `)
  })
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function renderCommit (commit) {
  return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}

function renderCommits (data) {
  let result = data.map((commit) => renderCommit(commit)).join('')
  return `<ul>${result}</ul>`
}

function showCommits(element) {
  $.get(`https://api.github.com/repos/${element.dataset.owner}/${element.dataset.repository}/commits`, data => {
    $('#details').html(renderCommits(data))
  }).fail(error => {
    displayError()
  })

}
