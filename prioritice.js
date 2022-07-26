const questions = [
  {
    label: "How many users are impacted by this incident?",
    options: [
      "0-10 users",
      "11-50 users",
      "51-150 users",
      "151-500 users",
      "500+ users",
    ],
  },
  {
    label: "What portion of the business is affected?",
    options: [
      "Exchanges",
      "Quotes",
      "Clearing",
      "Analytics",
      "Indices",
      "Mortgage",
    ],
  },
  {
    label: "Is this a business critical configuration item?",
    options: [
      "Yes",
      "No"
    ],
  },
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
  }).then(response => response.json()).then(data => {
    console.log(JSON.stringify(data, null, 2))
  })
}

function main() {
  const form = document.querySelector('#mainForm')
  console.log(form)
  formInnerHTML = ''
  for (const [i, question] of questions.entries()) {
    formInnerHTML += `
      <div class="form-group">
        <label for="input${i}">${question.label}</label>
        <select class="form-control" name="input${i} id="input${i}">
    `
    for (const option of question.options) {
      formInnerHTML += `
          <option value="${option}">${option}</option>
      `
    }
    formInnerHTML += `
        </select>
      </div>
    `
  }
  formInnerHTML += `
    <br>
    <div align="right">
      <button id="submitButton" type="submit" class="btn btn-primary">Submit</button>
    </div>
  `
  form.innerHTML = formInnerHTML
  document.querySelector('#submitButton').addEventListener('click', (event) => {
    event.preventDefault()
    onSubmit()
  })
}

window.addEventListener('DOMContentLoaded', () => {
  main()
})