console.log("CLient side javascrtipt program ")






const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#message-1');
const message2=document.querySelector('#message-2');

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()//this wont resset the page all the time which alllow the server to render a new page it stops  that
    
    const location=search.value

    message1.textContent='Load ho raha hai bsdk';
    message2.textContent=''; 

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
          message1.textContent=data.error;

        }else{
            message1.textContent=data.location;
            message2.textContent=data.forecast;
            
        }
    }) 
})
}) 
