document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const name = e.target.name.value;
    const email = e.target.email.value;
    const description = e.target.description.value;
    const contact = e.target.contact.value;
  
    try {
        const response = await fetch('http://localhost:4000/submit-contact', {
            method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, description, contact })
      })
  
      const result = await response.json();
      console.log(result);
  
      if (response.ok) {
        document.getElementById('popupMessage').innerText = result.message;
        document.getElementById('popup').style.display = 'block';
        e.target.reset();
      } else {
        alert('Failed to submit your question. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  });
  
  function closePopup() {
    document.getElementById('popup').style.display = 'none';
  }
  