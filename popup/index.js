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

const difficulty = document.getElementById("difficulty")
chrome.storage.local.get(['all','blind','neet','difficulty'],(res=>{
  problem.textContent = res.neet[0].category
  difficulty.value = res.difficulty
}))

submitBtn.addEventListener('click',()=>{
  chrome.storage.local.set({
    difficulty: difficulty.value
  })
})
