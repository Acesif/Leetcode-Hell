chrome.runtime.onInstalled.addListener((details)=>{
  chrome.storage.local.set({
    all: [],
    blind: [],
    neetcode: []
  })
  fetch("https://raw.githubusercontent.com/Acesif/Leetcode-Hell/main/problems/all.json")
  .then(res=>res.json())
  .then(data=> {
    chrome.storage.local.set({
        all: data
      })   
  })

  fetch("https://raw.githubusercontent.com/Acesif/Leetcode-Hell/main/problems/blind75.json")
  .then(res=>res.json())
  .then(data=> {
    chrome.storage.local.set({
        blind: data
      })   
  })

  fetch("https://raw.githubusercontent.com/Acesif/Leetcode-Hell/main/problems/neetcode150.json")
  .then(res=>res.json())
  .then(data=> {
    chrome.storage.local.set({
        neet: data
      })   
  })
})
// chrome.windows.onCreated.addListener(()=>{
//   const d = new Date()
//   console.log("created",d.getMinutes())
// })

chrome.storage.local.get(['all','blind','neet'],(res=>{
  problems = [res.all,res.blind,res.neet]
}))

let problems = [] 
let set = 0 
chrome.alarms.create({
  periodInMinutes: 1/60,
})

chrome.alarms.onAlarm.addListener((alarm)=>{
  currentTab()
  checkSet()
})

const checkSet = () => {
  chrome.storage.local.get(['set'],(res=>{
    set = Number(res.set)
  }))
}

const randomizer = (len) => {
  return Math.floor(Math.random()*len)
}
const keywords = ["https://leetcode.com/","brave://extensions","chrome://extensions","edge://extensions"]
const currentTab = () => {
  const rand = randomizer(problems[set].length)
  chrome.runtime.sendMessage(rand)
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    try {
      const exceptions = keywords.some((item)=>{
        return tabs[0].url.includes(item)
      })
      if(!exceptions){
        // chrome.tabs.update({url: `${problems[set][rand].href}`})
      }
    } catch (error) {
      console.log(error)
    }
  })
}

