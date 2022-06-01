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
const toggleDoor = () => {
    console.log('isPremium()', isPremium());
    if(isPremium()){
        openDoor();
    }else{
        closeDoor();
    }
}

WA.onInit().then( async () => {
    //close the door
    closeDoor();

    //subscribe to open the door if user is premium
    WA.room.onEnterLayer('doorZone').subscribe(toggleDoor);


    console.info('Init WA OITF');

    //define the domain
    let userDomain: string = '';
    if(WA.state.hasVariable('domain')){
        userDomain = (WA.state.loadVariable('domain') as string);
    }
    
    WA.player.tags.forEach((e: string) => {
        console.log(e);
        if(e.match(/http(?:s)?:\/\/(?:[\w-]+\.)*([\w-]{1,63})(?:\.(?:\w{3}|\w{2,10}))(?:$|\/)/i) != null){
            userDomain = e;
        }
    });

    if(userDomain !== ''){
        //delete '/' caractere if exist
        if(userDomain.substring(userDomain.length -1, userDomain.length -1) === '/'){
            userDomain = userDomain.substring(0, userDomain.length -1);
        }
    }
    console.log('userDomain', userDomain);

    const urlVideo = WA.state.loadVariable('urlVideo');
    if(urlVideo != null){
        const url = `${userDomain}${urlVideo}/${WA.player.id}?currentUrl=${encodeURI(window.location.href)}`;
        lissenLayer(VIDEO_LAYER, url);
    }

    const urlDocument = WA.state.loadVariable('urlDocument');
    if(urlDocument != null){
        const url = `${userDomain}${urlDocument}/${WA.player.id}?currentUrl=${encodeURI(window.location.href)}`;
        lissenLayer(DOCUMENT_LAYER, url);
    }

    const chapitreChoice = WA.state.loadVariable('chapitreChoice');
    if(chapitreChoice != null){
        const url = `${userDomain}${chapitreChoice}/${WA.player.id}?currentUrl=${encodeURI(window.location.href)}`;
        lissenLayer(PANNEAU_LAYER, url);
        lissenLayer(EXIT_CERCLE_TO_CHAPITRE_LAYER_PUBLIC, url);
        lissenLayer(EXIT_CERCLE_TO_CHAPITRE_LAYER_PRIVATE, url);
        lissenLayer(EXIT_SESSION_TO_CHAPITRE_LAYER_PRIVATE, url);
    }

    const projectChoice = WA.state.loadVariable('projectChoice');
    if(projectChoice != null){
        const url = `${userDomain}${projectChoice}/${WA.player.id}?currentUrl=${encodeURI(window.location.href)}`;
        lissenLayer(EXIT_CHAPITRE_TO_CERCLE_LAYER_PUBLIC, url);
        lissenLayer(EXIT_CHAPITRE_TO_CERCLE_LAYER_PRIVATE, url);
        lissenLayer(EXIT_SESSION_TO_CERCLE_LAYER_PRIVATE, url);
    }

    const eventChoice = WA.state.loadVariable('eventChoice');
    if(eventChoice != null){
        const url = `${userDomain}${eventChoice}/${WA.player.id}?currentUrl=${encodeURI(window.location.href)}`;
        lissenLayer(EXIST_TO_EVENT_LAYER, url);
        lissenLayer(EXIT_CERCLE_TO_SESSION_LAYER_PRIVATE, url);
        lissenLayer(EXIT_CERCLE_TO_SESSION_LAYER_PUBLIC, url);
    }

    //Embeded website video
    const website = await WA.room.website.get("iframeVideoAutiroriumYoutube");
    if(website != undefined){
        //define Youtube video in variable
        if(WA.state.hasVariable('urlVideoAutiroriumYoutube')){
            website.url = (WA.state.loadVariable('urlVideoAutiroriumYoutube') as string);
        }
        //subscribe change
        WA.state.onVariableChange('urlVideoAutiroriumYoutube').subscribe((data: unknown) => {
            website.url = (WA.state.loadVariable('urlVideoAutiroriumYoutube') as string);
        });

        /*focus camera on the video when user enter in the zone
        WA.room.onEnterLayer('AutiroriumYoutube').subscribe(() => {
            WA.camera.set(
                website.x,
                website.y,
                website.width,
                website.height,
                true,
                true
            );
        });
        //unfocus camera when user leave the zone
        WA.room.onLeaveLayer('AutiroriumYoutube').subscribe(() =>{
            WA.camera.followPlayer();
        });*/
    }
});

const lissenLayer = (layer: string, url: string) => {
    WA.room.onEnterLayer(layer).subscribe(() => {
        WA.nav.openCoWebSite(url, true, 'fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; midi;')
    });
    WA.room.onLeaveLayer(layer).subscribe(() => WA.nav.closeCoWebSite());
}
