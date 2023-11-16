chrome.runtime.onInstalled.addListener((details)=>{
  chrome.storage.local.set({
    all: [],
    blind: [],
    neetcode: []
  })
  fetch("https://raw.githubusercontent.com/The-CodingSloth/haha-funny-leetcode-extension/main/leetcode-problems/allProblems.json")
  .then(res=>res.json())
  .then(data=> {
    chrome.storage.local.set({
        all: data
      })   
  })

  fetch("https://raw.githubusercontent.com/The-CodingSloth/haha-funny-leetcode-extension/main/leetcode-problems/blind75Problems.json")
  .then(res=>res.json())
  .then(data=> {
    chrome.storage.local.set({
        blind: data
      })   
  })

  fetch("https://raw.githubusercontent.com/The-CodingSloth/haha-funny-leetcode-extension/main/leetcode-problems/neetCode150Problems.json")
  .then(res=>res.json())
  .then(data=> {
    chrome.storage.local.set({
        neet: data
      })   
  })
})

chrome.storage.local.get(['all','blind','neet'],(res=>{
  problems = [res.all,res.blind,res.neet]
  diff = res.difficulty
}))

let problems = []
let diff = null 
let status = true

chrome.alarms.create({
  periodInMinutes: 1/60,
})

chrome.alarms.onAlarm.addListener((alarm)=>{
  currentTab()
  checkDifficulty()
})


const randomizer = (len) => {
  return Math.floor(Math.random()*len)
}
const keywords = ["https://leetcode.com/","brave://extensions","chrome://extensions"]
const currentTab = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    try {
      const exceptions = keywords.some((item)=>{
        return tabs[0].url.includes(item)
      })
      if(!exceptions){
        const rand = randomizer(problems[diff].length)
        // chrome.tabs.update({url: `${problems[diff][rand].href}`})
      }
    } catch (error) {
      console.log(error)
    }
  })
}
// const toggleStatus = () =>{
//   chrome.storage.sync.get(["status"],(res)=>{
//     status = res.status
//   })
// }
const checkDifficulty = () => {
  chrome.storage.local.get(['difficulty'],(res=>{
    if(res.difficulty === 'All'){
      diff = 0
    }
    else if(res.difficulty === 'Blind'){
      diff = 1
    }
    else{
      diff = 2
    }
  }))
}

