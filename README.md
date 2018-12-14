# Animatext
![](https://media.giphy.com/media/k579ZxQrVX54BkOqvD/giphy.gif)

## Usage

1. Get the javascript file [here](https://github.com/EviusIndustri/animatext/blob/master/dist/animatext.min.js) and include it in your html file 
`<script src="js/animatext.min.js"></script>`
2. Use `animatext` function to animate text change<br/>Example:
    ```
    let original = 'abc'
    let target = 'def'
    let interval = 50 // in ms
    let duration = 2000 // in ms

    animatext(original, target, interval, duration, function(result) {
        console.log(result.text)
        if(result.done) {
            console.log('done!')
        }
    })
    ```
    `animatext` accepts 5 parameters:
    1. First parameter is the original text (`string`)
    2. Second parameter is the target text (`string`)
    3. Third parameter is the interval change for the characters from original text to     target text (`number`)
    4. Fourth parameter is the duration of text transformation (`number`)
    5. Fifth parameter used for callback in each interval (`function`)
3. Callback can be used to trigger state change or dom manipulation

## About
Animatext works by calculating the distance between each characters of the current text with the target text using its ascii code. The interval and duration are used to measure the rate of change of every characters based on its distance.

To create randomness, animatext add noise to each characters' distance so some of them will be correctly transformed into the target character before the duration time.

## License
Animatext is licensed under the Unlicense.
