export const generateUri = (uriKey: string, params?: string[]) => {
    let resource = 'todo';

    switch (uriKey) {
        case 'map':
            resource = '/map';
            break;
        case 'dashboard':
            resource = '/';
            break;
        case 'feed':
            resource = '/feed';
            break;
        case 'events':
            resource = '/events';
            break;
        case 'ranking':
            resource = '/ranking';
        case 'athleteRanking':
            resource = params ? `/athletes/${params[0]}/ranking` : '/ranking';
            break;
        case 'event':
            resource = params ? `/events/${params[0]}` : '/events';
            break;
        case 'athletes':
            resource = '/athletes';
            break;
        case 'race':
            resource = '/race';
            break;
        case 'chat':
            resource = '/chat';
            break;
        case 'feedEditor':
            resource = '/admin/feed-editor';
            break;
        case 'about':
            resource = '/about';
            break;
        case 'medias':
            resource = '/medias';
            break;
        case 'athlete':
            resource = params ? `/athletes/${params[0]}` : '/athletes';
            break;
        case 'athleteAbout':
            resource = params ? `/athletes/${params[0]}/about` : '/athletes';
            break;
        case 'athleteMap':
            resource = params ? `/athletes/${params[0]}/map` : '/athletes';
            break;
    }

    if (resource === 'todo')
        throw new Error(
            `URI key ${uriKey} not found, please define it in src/routes/uriMapping.ts`,
        );

    return resource;
};
