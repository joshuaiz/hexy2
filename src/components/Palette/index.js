import React, { useState, useEffect, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { db } from '../../config/firebaseconfig'
import * as firebase from 'firebase/app'
import Swatch from '../Swatch'
import PalettePDF from './PalettePDF'
import { getPalettes } from '../../utils/user'
import './Palette.scss'

const Palette = React.memo(
    ({ location, favorites, handleFavorites, removeFavorite }) => {
        const [currentPalette, setCurrentPalette] = useState()

        const url = location.pathname
        const paletteID = url.split('/').pop()
        const sharedPalette = db.collection('shared_palettes').doc(paletteID)

        const getPalette = useCallback(() => {
            let didCancel = false
            let getDoc = sharedPalette
                .get()
                .then(doc => {
                    if (!doc.exists) {
                        console.log('No such document!')
                    } else {
                        // console.log('Document data:', doc.data())
                        if (!didCancel) {
                            setCurrentPalette(doc.data())
                        }
                    }
                })
                .catch(err => {
                    console.log('Error getting document', err)
                })

            return () => {
                didCancel = true
            }
        }, [])

        // const getPalette = () => {
        //     let getDoc = sharedPalette
        //         .get()
        //         .then(doc => {
        //             if (!doc.exists) {
        //                 console.log('No such document!')
        //             } else {
        //                 // console.log('Document data:', doc.data())

        //                 setCurrentPalette(doc.data())
        //             }
        //         })
        //         .catch(err => {
        //             console.log('Error getting document', err)
        //         })
        // }

        useEffect(() => {
            getPalette()
        }, [])

        console.log(currentPalette && currentPalette.palette.palette)

        return (
            <div className="palette-page">
                <h1>
                    Hexy Palette:{' '}
                    <span className="palette-name">
                        {currentPalette && currentPalette.name}
                    </span>{' '}
                    <span className="palette-date">
                        {currentPalette && currentPalette.date}
                    </span>{' '}
                </h1>
                <div className="palette-meta">
                    <h2>
                        <span className="palette-link">
                            Link:{' '}
                            <a
                                href={`${window.location.origin.toString()}${
                                    location.pathname
                                }`}
                            >{`${window.location.origin.toString()}${
                                location.pathname
                            }`}</a>
                        </span>
                    </h2>
                    <PalettePDF
                        palette={
                            currentPalette && currentPalette.palette.palette
                        }
                        paletteName={currentPalette && currentPalette.name}
                    />
                </div>

                <ul className="user-palette nostyle">
                    {currentPalette &&
                        currentPalette.palette.palette.map((color, index) => {
                            return (
                                <Swatch
                                    key={color.hex}
                                    color={color}
                                    index={index}
                                    handleFavorites={handleFavorites}
                                    removeFavorite={removeFavorite}
                                    favorites={favorites}
                                />
                            )
                        })}
                </ul>
            </div>
        )
    }
)

// Palette.whyDidYouRender = true

export default withRouter(Palette)
