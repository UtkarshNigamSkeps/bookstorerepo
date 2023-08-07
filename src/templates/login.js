const loginHandler = async() =>{
    // event.preventDefault();
    console.log("email");
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    if(!localStorage.getItem("tokenid")){

        try {
      
          const response = await fetch("http://localhost:3000/auth/login", {
      
              method: "POST",
      
              headers: {
      
                  "Content-Type": "application/json"
      
              },
      
              body: JSON.stringify({ email, password })
      
          }).then(res => res.json())

          console.log(response)
      
          const token = response.token
      
          localStorage.setItem("tokenid",token);
      
        } catch (error) {
      
            console.error("Error during login:", error);
      
        }
      
      }else{      
        window.location.href = "dashboard.html"; 
    }
    
}