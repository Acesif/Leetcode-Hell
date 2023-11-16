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
}))

let problems = []
let set = null 

chrome.alarms.create({
  periodInMinutes: 1/60,
})

chrome.alarms.onAlarm.addListener((alarm)=>{
  currentTab()
  checkSet()
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
        const rand = randomizer(problems[set].length)
        chrome.tabs.update({url: `${problems[set][rand].href}`})
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
const checkSet = () => {
  chrome.storage.local.get(['set'],(res=>{
    if(res.set === 'All'){
      set = 0
    }
    else if(res.set === 'Blind'){
      set = 1
    }
    else{
      set = 2
    }
  }))
}

