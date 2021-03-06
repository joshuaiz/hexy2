import React from 'react'
import { Link } from 'react-router-dom'
import namedColors from 'color-name-list'
import * as tinycolor from 'tinycolor2'
import moment from 'moment'
import Logo from '../components/Logo'

/* eslint-disable */
export function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}

export function humanize(str) {
    if (!str) {
        return
    }
    let i
    let frags = str.split('_')
    for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1)
    }
    return frags.join(' ')
}

export function isEmail(email) {
    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(
        email
    )
}

export function onlyLetters(str) {
    return str.match('^[A-z0-9]+$')
}

export function checkInputChars(text) {
    var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/) //unacceptable chars
    if (pattern.test(text)) {
        // alert(
        //     'Palette names may only use standard characters ("A-Z", "a-z", "_", "0-9" ).'
        // )
        return false
    }
    return true //good user input
}

export function getParameterByName(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
    var regexS = '[\\?&]' + name + '=([^&#]*)'
    var regex = new RegExp(regexS)
    var results = regex.exec(window.location.href)
    if (results == null) return ''
    else return decodeURIComponent(results[1].replace(/\+/g, ' '))
}

export function makeid(length) {
    var result = ''
    var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )
    }
    return result
}

export function getCurrentDateTime() {
    return moment().format()
}

export function getDateString(date) {
    return moment(date).toISOString()
}

export function getExpirationDate(dateStr) {
    let exp = moment(dateStr)
        .add(1, 'year')
        .format('LLLL')

    return exp
}

export function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
}

export const getNumberOfFavorites = currentUser => {
    let numFaves = 5
    if (currentUser) {
        const accountType = currentUser.accountType

        if (accountType) {
            if (accountType === 'pro') {
                numFaves = 10
            } else if (
                accountType === 'pro_unlimited' ||
                accountType === 'pro_lifetime'
            ) {
                numFaves = 15
            }
        }
    }
    return numFaves
}

export const favoritesErrorContent = (
    user,
    currentUser,
    numFaves,
    toggleErrorModal
) => {
    const phrases = [
        'Whoa there...slow your roll.',
        'Hey...mucho take it easy.',
        'More colors would be sweet.'
    ]

    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]

    console.log('favoritesErrorContent called')

    return (
        <div className="error-message">
            <div className="error-header">
                <Logo />
                <h2>{randomPhrase}</h2>
            </div>
            <h3>The maximum number of favorites is {numFaves}.</h3>
            {!user && (
                <div>
                    <p>
                        <Link to="/account">Log in</Link> or get a{' '}
                        <Link to="/pro">Hexy Pro</Link> account to save up to 15
                        favorites.
                    </p>
                    <p>
                        Plus a lot of really cool other features like private
                        palettes, export to SCSS and more.
                    </p>
                    <button
                        className="button"
                        onClick={() => toggleErrorModal(false)}
                    >
                        <Link to="/pro">Go Pro</Link>
                    </button>
                </div>
            )}
            {user && currentUser && currentUser.accountType === 'standard' && (
                <div>
                    <p>
                        Get a <Link to="/pro">Hexy Pro</Link> account to save up
                        to 15 favorites plus a lot of really cool other features
                        like private palettes, export to SCSS and more.
                    </p>
                    <button
                        className="button"
                        onClick={() => toggleErrorModal(false)}
                    >
                        <Link to="/pro">Go Pro</Link>
                    </button>
                </div>
            )}
            {user && currentUser && currentUser.accountType === 'pro' && (
                <p>
                    Upgrade your{' '}
                    <Link to="/pro" onClick={() => toggleErrorModal(false)}>
                        Hexy Pro
                    </Link>{' '}
                    account to save up to 15 favorites.
                </p>
            )}
        </div>
    )
}

export const setSessionStorage = (identifier, item) => {
    // console.log('setSessionStorage', identifier, item)
    const storageItem = JSON.stringify(item)
    sessionStorage.setItem(identifier, storageItem)
}

export const getSessionStorage = identifier => {
    // console.log('getSessionStorage', identifier)
    const cachedItem = sessionStorage.getItem(identifier)
    const parsedCachedItem = JSON.parse(cachedItem)
    return parsedCachedItem
}

export const setLocalStorage = (identifier, item) => {
    // console.log('setSessionStorage', identifier, item)
    const storageItem = JSON.stringify(item)
    localStorage.setItem(identifier, storageItem)
}

export const getLocalStorage = identifier => {
    // console.log('getSessionStorage', identifier)
    const cachedItem = localStorage.getItem(identifier)
    const parsedCachedItem = JSON.parse(cachedItem)
    return parsedCachedItem
}

export function arrayDiffByKey(key, ...arrays) {
    return [].concat(
        ...arrays.map((arr, i) => {
            const others = arrays.slice(0)
            others.splice(i, 1)
            const unique = [...new Set([].concat(...others))]
            return arr.filter(x => !unique.some(y => x[key] === y[key]))
        })
    )
}

export const hexColors = getHexArray(namedColors)

export function getNumberOfNamedColors() {
    const num = namedColors.length
    return numberWithCommas(num)
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function getReadableColor(color) {
    if (color) {
        const readableColor = tinycolor
            .mostReadable(color.hex, ['#FFF', '#000'], {
                includeFallbackColors: true
            })
            .toHexString()
        return readableColor
    }
    return false
}

export function getColorByHex(hex) {
    let namedColor = namedColors.filter((item, index) => {
        if (hex !== '' && item.hex.toLowerCase().includes(hex)) {
            return item
        }
        return null
    })
    return namedColor
}

export function getNamedColor(color) {
    let namedColor = namedColors.filter((item, index) => {
        if (color.hex !== '' && item.hex.toLowerCase().includes(color.hex)) {
            return item
        }

        return null
    })
    return namedColor
}

export function generateRandoms(min, max, numOfRandoms, unique) {
    /* min is the smallest possible generated number */
    /* max is the largest possible generated number */
    /* numOfRandoms is the number of random numbers to generate */
    /* unique is a boolean specifying whether the generated random numbers need to be unique */
    var getRandom = function(x, y) {
        return Math.floor(Math.random() * (x - y + 1) + y)
    }
    var randoms = []
    while (randoms.length < numOfRandoms) {
        var random = getRandom(min, max)
        if (randoms.indexOf(random) === -1 || !unique) {
            randoms.push(random)
        }
    }
    return randoms
}

export function getRandomColors(num) {
    const randoms = generateRandoms(0, namedColors.length, num, true)
    const randomColors = namedColors.filter((d, i) => randoms.indexOf(i) !== -1)

    return randomColors
}

export function getAllColors() {
    return namedColors
}

export function sortLightness(colors) {
    const brightSort = colors.sort(function(a, b) {
        let color1 = tinycolor(a.hex)
        let color2 = tinycolor(b.hex)
        return color1.toHsl().l < color2.toHsl().l ? 1 : -1
    })

    return brightSort
}

export function filterColorsBySearchText(text) {
    let validHex = /(^#?[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(text)
    const filterList = namedColors.filter((item, index) => {
        if (
            (text !== '' && item.name.toLowerCase().includes(text)) ||
            (text !== '' && item.hex.toLowerCase().includes(text))
        ) {
            return item
        } else {
            return false
        }
    })
    return filterList
}

export function getHexArray(array) {
    let hexColors = []
    hexColors = array.map((color, index) => {
        return color.hex
    })
    return hexColors
}

export function getTintsShades(adjustment, color) {
    const adj = adjustment
    const colors = [{ name: '', hex: color }]
    let shade, tint
    for (let i = 0, n = 10; i < 5; i++, n += 20) {
        if (adj === 'darken') {
            shade = tinycolor.mix(color, 'black', n).toHexString()
            // let currentColor = colors[i].hex
            if (!colors.includes(shade)) {
                colors.push({ name: '', hex: shade })
            }
        } else if (adj === 'lighten') {
            tint = tinycolor.mix(color, 'white', n).toHexString()
            if (!colors.includes(tint)) {
                colors.push({ name: '', hex: tint })
            }
        } else {
            return []
        }
    }
    return colors
}

export function rgbToXYZ(rgb) {
    let sR = rgb.r
    let sG = rgb.g
    let sB = rgb.b

    //sR, sG and sB (Standard RGB) input range = 0 Ã· 255
    //X, Y and Z output refer to a D65/2Â° standard illuminant.

    let R = sR / 255
    let G = sG / 255
    let B = sB / 255

    let X, Y, Z

    if (R > 0.04045) R = ((R + 0.055) / 1.055) ^ 2.4
    else R = R / 12.92
    if (G > 0.04045) G = ((G + 0.055) / 1.055) ^ 2.4
    else G = G / 12.92
    if (B > 0.04045) B = ((B + 0.055) / 1.055) ^ 2.4
    else B = B / 12.92

    R = R * 100
    G = G * 100
    B = B * 100

    X = R * 0.4124 + G * 0.3576 + B * 0.1805
    Y = R * 0.2126 + G * 0.7152 + B * 0.0722
    Z = R * 0.0193 + G * 0.1192 + B * 0.9505

    const xyz = { x: X, y: Y, z: Z }

    return xyz
}

export function xyzToAdobeRGB(xyz) {
    let x = xyz.x
    let y = xyz.y
    let z = xyz.z

    let X = x / 100
    let Y = y / 100
    let Z = z / 100

    let R = X * 2.04137 + Y * -0.56495 + Z * -0.34469
    let G = X * -0.96927 + Y * 1.87601 + Z * 0.04156
    let B = X * 0.01345 + Y * -0.11839 + Z * 1.01541

    R = R ^ (1 / 2.19921875)
    G = G ^ (1 / 2.19921875)
    B = B ^ (1 / 2.19921875)

    let aR = R * 255
    let aG = G * 255
    let aB = B * 255

    const aRGB = { R: aR, G: aG, B: aB }

    return aRGB
}

export function xyzToHunterLab(xyz, rX, rY, rZ) {
    let X = xyz.x
    let Y = xyz.y
    let Z = xyz.z

    let refX = rX || 100
    let refY = rY || 100
    let refZ = rZ || 100

    //refX, Y and Z refer to specific illuminants and observers.
    //Common ref values are available below in this same page.

    let Ka = (175.0 / 198.04) * (refY + refX)
    let Kb = (70.0 / 218.11) * (refY + refZ)

    let hL = 100.0 * Math.sqrt(Y / refY)
    let hA = Ka * ((X / refX - Y / refY) / Math.sqrt(Y / refY))
    let hB = Kb * ((Y / refY - Z / refZ) / Math.sqrt(Y / refY))

    const hLAB = { l: hL, a: hA, b: hB }

    return hLAB
}

export function xyzToCIELab(xyz, rX, rY, rZ) {
    let X = xyz.x
    let Y = xyz.y
    let Z = xyz.z

    let refX = rX || 100
    let refY = rY || 100
    let refZ = rZ || 100

    //Reference-X, Y and Z refer to specific illuminants and observers.
    //Common reference values are available below in this same page.

    let nX = X / refX
    let nY = Y / refY
    let nZ = Z / refZ

    if (nX > 0.008856) nX = Math.pow(nX, 1 / 3)
    else nX = 7.787 * nX + 16 / 116

    if (nY > 0.008856) nY = Math.pow(nY, 1 / 3)
    else nY = 7.787 * nY + 16 / 116

    if (nZ > 0.008856) nZ = Math.pow(nZ, 1 / 3)
    else nZ = 7.787 * nZ + 16 / 116

    let cieL = 116 * nY - 16
    let cieA = 500 * (nX - nY)
    let cieB = 200 * (nY - nZ)

    const cieLAB = { l: cieL, a: cieA, b: cieB }

    return cieLAB
}

export function hexToCMYK(hex) {
    var computedC = 0
    var computedM = 0
    var computedY = 0
    var computedK = 0

    hex = hex.charAt(0) === '#' ? hex.substring(1, 7) : hex

    if (hex.length !== 6) {
        alert('Invalid length of the input hex value!')
        return
    }
    if (/[0-9a-f]{6}/i.test(hex) !== true) {
        alert('Invalid digits in the input hex value!')
        return
    }

    var r = parseInt(hex.substring(0, 2), 16)
    var g = parseInt(hex.substring(2, 4), 16)
    var b = parseInt(hex.substring(4, 6), 16)

    // BLACK
    if (r === 0 && g === 0 && b === 0) {
        computedK = 1
        return [0, 0, 0, 1]
    }

    computedC = 1 - r / 255
    computedM = 1 - g / 255
    computedY = 1 - b / 255

    var minCMY = Math.min(computedC, Math.min(computedM, computedY))

    computedC = ((computedC - minCMY) / (1 - minCMY)) * 100
    computedM = ((computedM - minCMY) / (1 - minCMY)) * 100
    computedY = ((computedY - minCMY) / (1 - minCMY)) * 100
    computedK = minCMY * 100

    // return [computedC, computedM, computedY, computedK]
    return {
        c: computedC,
        m: computedM,
        y: computedY,
        k: computedK
    }
}

export function inverseColor(color) {
    const rgb = tinycolor(color).toRgb()
    return tinycolor({
        r: 255 - rgb.r,
        g: 255 - rgb.g,
        b: 255 - rgb.b
    }).toHexString()
}
