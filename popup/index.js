const submitBtn = document.getElementById("submit-btn")
const problem = document.getElementById("problem")
// submitBtn.addEventListener('click',(e)=>{
//   let status;
//   chrome.storage.sync.get(["status"],(res)=>{
//     status = res.status ?? false
//     if(status){
//       submitBtn.textContent = `${status}`
//     }
//     else{
//       submitBtn.textContent = `${status}`
//     }
//     chrome.storage.sync.set({!status})
//   })
// })

const set = document.getElementById("set")
chrome.storage.local.get(['all','blind','neet','set'],(res=>{
  set.value = res.set
  chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{
    const sets = [res.all,res.blind,res.neet]
    const title = sets[set.value][message].text
    const href = sets[set.value][message].href
    problem.innerHTML = `<a href=${href} target="_blank"><h3>${title}</h3></a>` 
  })
}))

submitBtn.addEventListener('click',()=>{
  chrome.storage.local.set({
    set: set.value
  })
})

