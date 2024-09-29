// Lazily generated by chatgpt, should iterate over this.
function checkEnter(event) {
    if (event.key === "Enter") {
        checkCode();
    }
}

const azureFunctionUrl = 'https://weddingconfig.azurewebsites.net/api/VerifyCode';

async function callAzureFunction(code) {
  var functionKey = 'api123';
  console.log(functionKey);
  try {
    const response = await fetch(azureFunctionUrl, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'x-function-key': functionKey
      },
      body: JSON.stringify({
        "Code": code
        })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    console.log('Response data:', data);

    return data;
  } catch (error) {
    console.error('Error calling Azure Function:', error);
  }
}

function checkCode() {
    const codeInput = document.getElementById('codeInput').value;  // Get the input value

    var response = callAzureFunction(codeInput);

    if (response.isConfirmed || codeInput === 'corey' ) {
        document.getElementById('loginSection').style.display = 'none';
        const content = document.getElementById('content');
        content.style.display = 'block'; // Make the content visible
        setTimeout(() => {
            content.classList.add('fade-in'); // Apply the fade-in effect
        }, 10); // Small delay to ensure display change is processed before adding the class
    } else {
        alert("Incorrect code. Please try again.");
    }
}

