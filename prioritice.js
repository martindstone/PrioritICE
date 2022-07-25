const questions = [
  "How many users are impacted by this incident?",
  "What portion of the business is affected?",
  "Is this a business critical configuration item?",
]

function onSubmit() {
  const query = new URLSearchParams(window.location.search)
  const incident_id = query.get('incident_id')
  const postUrl = query.get('post_url')
  if ( !incident_id ) {
    alert('No incident ID was specified')
    return
  }
  const postBody = {incident_id}
  for (input of document.querySelectorAll('#mainform input')) {
    postBody[input.labels[0].textContent] = input.value
  }
  fetch(postUrl, {
    method: 'POST',
    body: JSON.stringify(postBody),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => console.log(response))
}

function main() {
  const form = document.querySelector('#mainForm')
  console.log(form)
  form.innerHTML = ''
  for (const [i, question] of questions.entries()) {
    form.innerHTML += `
      <div class="form-group">
        <label for="input${i}">${question}</label>
        <input type="text" class="form-control" id="input${i}">
      </div>
    `
  }
  form.innerHTML += `
    <button id="submitButton" type="submit" class="btn btn-primary">Submit</button>
  `
  document.querySelector('#submitButton').addEventListener('click', (event) => {
    event.preventDefault()
    onSubmit()
  })
}

window.addEventListener('DOMContentLoaded', () => {
  main()
})