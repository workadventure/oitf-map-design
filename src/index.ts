/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

const VIDEO_LAYER = 'Video';
const DOCUMENT_LAYER = 'Document';
const PANNEAU_LAYER = 'urlPanneau';
const EXIT_CHAPITRE_TO_CERCLE_LAYER_PUBLIC = 'openWebsitEexitChapitreToCerclePublic';
const EXIT_CHAPITRE_TO_CERCLE_LAYER_PRIVATE = 'openWebsitEexitChapitreToCerclePrivate';
const EXIT_CERCLE_TO_CHAPITRE_LAYER_PUBLIC = 'openWebsitEexitCercleToChapitrePublic';
const EXIT_CERCLE_TO_CHAPITRE_LAYER_PRIVATE = 'openWebsitEexitCercleToChapitrePrivate';
const EXIT_CERCLE_TO_SESSION_LAYER_PUBLIC = 'openWebsitEexitCercleToSessionPublic';
const EXIT_CERCLE_TO_SESSION_LAYER_PRIVATE = 'openWebsitEexitCercleToSessionPrivate';
const EXIT_SESSION_TO_CERCLE_LAYER_PRIVATE = 'openWebsitEexitSessionToCerclePrivate';
const EXIT_SESSION_TO_CHAPITRE_LAYER_PRIVATE = 'openWebsitEexitSessionToChapitrePrivate';
const EXIST_TO_EVENT_LAYER = 'openWebsiteExitToEvent';

/* #Manage premium door */

const DOOR_CLOSED_LAYER_NAME = 'doorClosed';
const DOOR_OPENED_LAYER_NAME = 'doorOpened';

const closeDoor = () => {
    WA.room.showLayer(DOOR_CLOSED_LAYER_NAME);
    WA.room.hideLayer(DOOR_OPENED_LAYER_NAME);
}
const openDoor = () => {
    WA.room.hideLayer(DOOR_CLOSED_LAYER_NAME);
    WA.room.showLayer(DOOR_OPENED_LAYER_NAME);
}
const isPremium = () => {
    return WA.player.tags.includes('premium') || WA.player.tags.includes('Premium') 
    || WA.player.tags.includes('PREMIUM') || WA.player.tags.includes('editor');
}
function toggleDoor() {
    console.log('isPremium()', isPremium());
    if(isPremium()){
        openDoor();
    }else{
        closeDoor();
    }
}

WA.onInit().then( () => {
    //close the door
    closeDoor();

    //subscribe to open the door if user is premium
    WA.room.onEnterLayer('doorZone').subscribe(toggleDoor);


    console.info('Init WA OITF');

    let userDomain: string = '';
    WA.player.tags.forEach((e: string) => {
        console.log(e);
        if(e.match(/http(?:s)?:\/\/(?:[\w-]+\.)*([\w-]{1,63})(?:\.(?:\w{3}|\w{2,10}))(?:$|\/)/i) != null){
            userDomain = e;
        }
    });

    //define the domain
    if(!WA.state.hasVariable('domain') && WA.state.loadVariable('domain') !== userDomain){
        WA.state.saveVariable('domain', userDomain);
    }

    //delete '/' caractere if exist
    if(userDomain.substring(userDomain.length -1, userDomain.length -1) === '/'){
        userDomain = userDomain.substring(0, userDomain.length -1);
    }
    console.log('domain', WA.state.loadVariable('domain'));

    const urlVideo = WA.state.loadVariable('urlVideo');
    if(urlVideo != null){
        WA.room.setProperty(VIDEO_LAYER, "openWebsite", `${userDomain}${urlVideo}/${WA.player.id}`);
        console.log(VIDEO_LAYER, `${userDomain}${urlVideo}/${WA.player.id}`);
    }

    const urlDocument = WA.state.loadVariable('urlDocument');
    if(urlDocument != null){
        WA.room.setProperty(DOCUMENT_LAYER, "openWebsite", `${userDomain}${urlDocument}/${WA.player.id}`);
        console.log(DOCUMENT_LAYER, `${userDomain}${urlVideo}/${WA.player.id}`);
    }

    const chapitreChoice = WA.state.loadVariable('chapitreChoice');
    if(chapitreChoice != null){
        WA.room.setProperty(PANNEAU_LAYER, "openWebsite", `${userDomain}${chapitreChoice}/${WA.player.id}`);
        WA.room.setProperty(EXIT_CERCLE_TO_CHAPITRE_LAYER_PUBLIC, "openWebsite", `${userDomain}${chapitreChoice}/${WA.player.id}`);
        WA.room.setProperty(EXIT_CERCLE_TO_CHAPITRE_LAYER_PRIVATE, "openWebsite", `${userDomain}${chapitreChoice}/${WA.player.id}`);
        WA.room.setProperty(EXIT_SESSION_TO_CHAPITRE_LAYER_PRIVATE, "openWebsite", `${userDomain}${chapitreChoice}/${WA.player.id}`);
        console.log(PANNEAU_LAYER, `${userDomain}${chapitreChoice}/${WA.player.id}`);
        console.log(EXIT_CERCLE_TO_CHAPITRE_LAYER_PUBLIC, `${userDomain}${chapitreChoice}/${WA.player.id}`);
        console.log(EXIT_CERCLE_TO_CHAPITRE_LAYER_PRIVATE, `${userDomain}${chapitreChoice}/${WA.player.id}`);
        console.log(EXIT_CERCLE_TO_CHAPITRE_LAYER_PRIVATE, `${userDomain}${chapitreChoice}/${WA.player.id}`);
    }

    const projectChoice = WA.state.loadVariable('projectChoice');
    if(projectChoice != null){
        WA.room.setProperty(EXIT_CHAPITRE_TO_CERCLE_LAYER_PUBLIC, "openWebsite", `${userDomain}${projectChoice}/${WA.player.id}`);
        WA.room.setProperty(EXIT_CHAPITRE_TO_CERCLE_LAYER_PRIVATE, "openWebsite", `${userDomain}${projectChoice}/${WA.player.id}`);
        WA.room.setProperty(EXIT_SESSION_TO_CERCLE_LAYER_PRIVATE, "openWebsite", `${userDomain}${projectChoice}/${WA.player.id}`);
        console.log(EXIT_CHAPITRE_TO_CERCLE_LAYER_PUBLIC, `${userDomain}${projectChoice}/${WA.player.id}`);
        console.log(EXIT_CHAPITRE_TO_CERCLE_LAYER_PRIVATE, `${userDomain}${projectChoice}/${WA.player.id}`);
        console.log(EXIT_SESSION_TO_CHAPITRE_LAYER_PRIVATE, `${userDomain}${projectChoice}/${WA.player.id}`);
    }

    const eventChoice = WA.state.loadVariable('eventChoice');
    if(eventChoice != null){
        WA.state.saveVariable('eventChoice', `${eventChoice}/${WA.player.id}`);
        WA.room.setProperty(EXIST_TO_EVENT_LAYER, "openWebsite", `${userDomain}${eventChoice}/${WA.player.id}`);
        WA.room.setProperty(EXIT_CERCLE_TO_SESSION_LAYER_PRIVATE, "openWebsite", `${userDomain}${eventChoice}/${WA.player.id}`);
        WA.room.setProperty(EXIT_CERCLE_TO_SESSION_LAYER_PUBLIC, "openWebsite", `${userDomain}${eventChoice}/${WA.player.id}`);
        console.log(EXIST_TO_EVENT_LAYER, `${userDomain}${eventChoice}/${WA.player.id}`);
        console.log(EXIT_CERCLE_TO_SESSION_LAYER_PRIVATE, `${userDomain}${eventChoice}/${WA.player.id}`);
        console.log(EXIT_CERCLE_TO_SESSION_LAYER_PUBLIC, `${userDomain}${eventChoice}/${WA.player.id}`);
    }
});
