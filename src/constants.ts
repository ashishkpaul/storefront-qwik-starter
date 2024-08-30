import { createContextId } from '@builder.io/qwik';
import { AppState } from './types';

export const APP_STATE = createContextId<AppState>('app_state');
export const AUTH_TOKEN = 'authToken';
export const CUSTOMER_NOT_DEFINED_ID = 'CUSTOMER_NOT_DEFINED_ID';
export const HEADER_AUTH_TOKEN_KEY = 'vendure-auth-token';
export const IMAGE_RESOLUTIONS = [1000, 800, 600, 400];
export const HOMEPAGE_IMAGE = '/homepage.webp';
export const DEFAULT_METADATA_URL = 'https://www..buylits.com';
export const DEFAULT_METADATA_TITLE = 'Buylits Local City Online Store';
export const DEFAULT_METADATA_DESCRIPTION =
	'Buylits: Control, Connect And Grow Your E-commerce Empire';
export const DEFAULT_METADATA_IMAGE =
	'https://cloud.dingpack.com/apps/files_sharing/publicpreview/aJB8Anwmry2Eojk?file=/&fileId=137915&x=1365&y=768&a=true&etag=da9211b04084681e5de0ebd71391633e';
export const DEFAULT_LOCALE = 'en';
// TODO: replace DEV_API and PROD_API with your dev and prod API urls.
export const DEV_API = 'http://core.vendure.lan';
export const PROD_API = 'http://core.vendure.lan';
// export const DEV_API = 'http://192.168.1.32:3001';
// export const PROD_API = 'http://192.168.1.32:3001';
export const LOCAL_API = 'http://192.168.1.32:3000';
