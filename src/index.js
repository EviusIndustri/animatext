const _randomMinMax = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

const _genNoise = () => {
  return _randomMinMax(1, 30)
}

const _genVelocity = (from, to, numOfSteps) => {
  const myNoise = _genNoise()
  const time = Math.max(numOfSteps - myNoise, 1)
  const myStep = Math.abs(from - to)/time
  return myStep
}

const _toAscii = (char) => {
  return char ? char.charCodeAt(0) : null
}

const animateText = (text, newText, interval = 50, duration = 3000, cb) => {
  let stepLengthReminder = 0

  const stepList = []
  const numOfSteps = duration/interval
	let currentStep = 0
	
  const stepLength = (Math.abs(newText.length - text.length)/numOfSteps)
	
	let from = text
  let to = newText
  
  if(newText.length < text.length) {
    from = newText
    to = text
  }
  
  from.split('').forEach((v, idx) => {
    const fromAscii = _toAscii(from[idx])
    const targetAscii = _toAscii(to[idx])
    stepList.push(_genVelocity(fromAscii, targetAscii, numOfSteps))
  })

  let splittedText = text.split('')
  let splittedTextAscii = splittedText.map((v) => {
    return v.charCodeAt(0)
  })
  
  const myInterval = setInterval(() => {
    if(splittedText.length > newText.length) {
      const tempStepLength = stepLength + stepLengthReminder
      splittedText = splittedText.slice(0, splittedText.length - Math.floor(tempStepLength))
      stepLengthReminder = tempStepLength % 1
    }
    else if(splittedText.length < newText.length) {
      const tempStepLength = stepLength + stepLengthReminder
      for(let i = 0; i < Math.floor(tempStepLength); i++) {
        const randomAscii = _randomMinMax(65, 123)
        const myAscii = _toAscii(newText[splittedText.length])
        stepList.push(_genVelocity(randomAscii, myAscii, numOfSteps - currentStep))
        splittedText.push(String.fromCharCode(randomAscii))
        splittedTextAscii.push(randomAscii)
      }
      stepLengthReminder = tempStepLength % 1
    }
    
    splittedText.forEach((c,idx) => {
      if(c != newText[idx]) {
        if(stepList[idx]) {
          const asciiText = splittedTextAscii[idx]
					const asciiNewText = newText.charCodeAt(idx)
					const nextAscii = asciiText > asciiNewText ? (asciiText - stepList[idx]) : (asciiText + stepList[idx])
					splittedTextAscii[idx] = nextAscii
					splittedText[idx] = String.fromCharCode(Math.round(nextAscii)) 
        }
        else {
          splittedText[idx] = String.fromCharCode(_randomMinMax(65, 123)) 
        }
      }
    })

		cb(splittedText.join(''))
    currentStep++
    if(splittedText.join('') === newText) {
			clearInterval(myInterval)
    }
  }, interval)
}

module.exports = animateText