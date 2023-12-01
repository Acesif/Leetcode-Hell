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
<<<<<<< HEAD
=======
const interval = document.getElementById("interval")
>>>>>>> parent of e3571f9 (rebuilding extension)
chrome.storage.local.get(['all','blind','neet','set'],(res=>{
  set.value = res.set
  chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{
    const sets = [res.all,res.blind,res.neet]
    const title = sets[set.value][message.rand].text
    const href = sets[set.value][message.rand].href
    problem.innerHTML = `<a href=${href} target="_blank"><h3>${title}</h3></a>` 
  })
}))

submitBtn.addEventListener('click',()=>{
  chrome.storage.local.set({
<<<<<<< HEAD
    set: set.value
=======
    set: set.value,
    interval: interval.value
>>>>>>> parent of e3571f9 (rebuilding extension)
  })
  chrome.runtime.sendMessage(null)
})

