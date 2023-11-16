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
  problem.textContent = res.neet[0].category
  set.value = res.set
}))

submitBtn.addEventListener('click',()=>{
  chrome.storage.local.set({
    set: set.value
  })
})
