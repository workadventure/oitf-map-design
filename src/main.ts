/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />
import { ActionMessage } from "@workadventure/iframe-api-typings"
import { bootstrapExtra } from "@workadventure/scripting-api-extra"

console.log('Script started successfully')

// Public links
const VIDEO_LAYER = 'Video'
const DOCUMENT_LAYER = 'Document'
const PANNEAU_LAYER = 'urlPanneau'

// Event exit
const EXIT_TO_EVENT_LAYER = 'ToEvent'

// Cercle exits
const EXIT_CHAPITRE_TO_CERCLE_PUBLIC = 'ChapitreToCerclePublic'
const EXIT_CHAPITRE_TO_CERCLE_PRIVATE = 'ChapitreToCerclePrivate'

const EXIT_CERCLE_TO_CHAPITRE_PUBLIC = 'CercleToChapitrePublic'
const EXIT_CERCLE_TO_CHAPITRE_PRIVATE = 'CercleToChapitrePrivate'

// Session exits
const EXIT_CERCLE_TO_SESSION_PUBLIC = 'CercleToSessionPublic'
const EXIT_CERCLE_TO_SESSION_PRIVATE = 'CercleToSessionPrivate'

const EXIT_SESSION_TO_CERCLE_PRIVATE = 'SessionToCerclePrivate'
const EXIT_SESSION_TO_CHAPITRE_PRIVATE = 'SessionToChapitrePrivate'

// Door states wording
const PREMIUM_DOOR = 'premiumDoor'
const VISIO_DOOR = 'visioDoor'
const MILAN_DOOR = 'milanDoor'
const JOHANNESBOURG_DOOR = 'johannesbourgDoor'

// Waiting for the API to be ready
WA.onInit().then(async () => {
    console.log('Scripting API ready')
    console.log('Player tags: ', WA.player.tags)

    // Manage the doors
    if (WA.state.hasVariable('milanURL')) {
        // only for RDV maps, they all have a milanURL variable
        closeDoor(VISIO_DOOR)
        closeDoor(MILAN_DOOR)
        closeDoor(JOHANNESBOURG_DOOR)
    }
    closeDoor(PREMIUM_DOOR)
    if (isPremium()) {
        if (WA.state.hasVariable('milanURL')) {
            listenDoor(VISIO_DOOR)
            listenDoor(MILAN_DOOR)
            listenDoor(JOHANNESBOURG_DOOR)
        }
        listenDoor(PREMIUM_DOOR)
    }

    // Manage the domain
    let userDomain: string = ''
    if (WA.state.hasVariable('domain')) {
        userDomain = (WA.state.loadVariable('domain') as string)
    }
    WA.player.tags.forEach((tag: string) => {
        if (tag.match(/http(?:s)?:\/\/(?:[\w-]+\.)*([\w-]{1,63})(?:\.(?:\w{3}|\w{2,10}))(?:$|\/)/i) != null) {
            userDomain = tag
        }
    })
    if (userDomain !== '') {
        //delete '/' caractere if exist
        if (userDomain.substring(userDomain.length - 1, userDomain.length - 1) === '/') {
            userDomain = userDomain.substring(0, userDomain.length - 1)
        }
    }

    const urlVideo = WA.state.loadVariable('urlVideo')
    if (urlVideo != null) {
        const url = `${userDomain}${urlVideo}/${WA.player.uuid}?currentUrl=${WA.room.id}`
        listenLayer(VIDEO_LAYER, url)
    }

    const urlDocument = WA.state.loadVariable('urlDocument')
    if (urlDocument != null) {
        const url = `${userDomain}${urlDocument}/${WA.player.uuid}?currentUrl=${WA.room.id}`
        listenLayer(DOCUMENT_LAYER, url)
    }

    const chapitreChoice = WA.state.loadVariable('chapitreChoice')
    if (chapitreChoice != null) {
        const url = `${userDomain}${chapitreChoice}/${WA.player.uuid}?currentUrl=${WA.room.id}`
        listenLayer(PANNEAU_LAYER, url)
        listenLayer(EXIT_CERCLE_TO_CHAPITRE_PUBLIC, url)
        listenLayer(EXIT_CERCLE_TO_CHAPITRE_PRIVATE, url)
        listenLayer(EXIT_SESSION_TO_CHAPITRE_PRIVATE, url)
    }

    const projectChoice = WA.state.loadVariable('projectChoice')
    if (projectChoice != null) {
        const url = `${userDomain}${projectChoice}/${WA.player.uuid}?currentUrl=${WA.room.id}`
        listenLayer(EXIT_CHAPITRE_TO_CERCLE_PUBLIC, url)
        listenLayer(EXIT_CHAPITRE_TO_CERCLE_PRIVATE, url)
        listenLayer(EXIT_SESSION_TO_CERCLE_PRIVATE, url)
    }

    const eventChoice = WA.state.loadVariable('eventChoice')
    if (eventChoice != null) {
        const url = `${userDomain}${eventChoice}/${WA.player.uuid}?currentUrl=${WA.room.id}`
        listenLayer(EXIT_TO_EVENT_LAYER, url)
        listenLayer(EXIT_CERCLE_TO_SESSION_PRIVATE, url)
        listenLayer(EXIT_CERCLE_TO_SESSION_PUBLIC, url)
    }

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready')
    }).catch(e => console.error(e))
}).catch(e => console.error(e))

const isPremium = () => {
    return WA.player.tags.includes('premium') || WA.player.tags.includes('editor')
}
const listenLayer = (layer: string, url: string) => {
    WA.room.onEnterLayer(layer).subscribe(() => {
        WA.nav.openCoWebSite(url, true, 'fullscreen; display-capture; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; midi; camera; microphone;')
    })
    WA.room.onLeaveLayer(layer).subscribe(() => WA.nav.closeCoWebSite())
}

const listenDoor = (door: string) => {
    let doorMessage: ActionMessage

    WA.room.area.onEnter(door).subscribe(() => {
        if (WA.state.loadVariable(door)) {
            doorMessage = WA.ui.displayActionMessage({
                message: "Press SPACE or touch here to Close the door",
                callback: () => {
                    closeDoor(door)
                }
            });
        } else {
            doorMessage = WA.ui.displayActionMessage({
                message: "Press SPACE or touch here to Open the door",
                callback: () => {
                    openDoor(door)
                }
            });
        }
    })

    WA.room.area.onLeave(door).subscribe(() => {
        doorMessage.remove()
    })
}

const openDoor = (door: string) => {
    WA.state.saveVariable(door, true)
}

const closeDoor = (door: string) => {
    WA.state.saveVariable(door, false)
}