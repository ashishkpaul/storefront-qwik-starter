import { createContextId } from '@builder.io/qwik';
import { AppState } from './types';

export const APP_STATE = createContextId<AppState>('app_state');
export const AUTH_TOKEN = 'authToken';
export const CUSTOMER_NOT_DEFINED_ID = 'CUSTOMER_NOT_DEFINED_ID';
export const HEADER_AUTH_TOKEN_KEY = 'vendure-auth-token';
export const IMAGE_RESOLUTIONS = [1000, 800, 600, 400];
export const HOMEPAGE_IMAGE = '/homepage.webp';
export const DEFAULT_METADATA_URL = 'https://seller.buylits.com';
export const DEFAULT_METADATA_TITLE = 'Buylits Local City Online Store';
export const DEFAULT_METADATA_DESCRIPTION =
	'Buylits: Control, Connect And Grow Your E-commerce Empire';
export const DEFAULT_METADATA_IMAGE =
	'https://demo.dingpack.store/assets/preview/4b/dingpack_social_share__preview.jpg?preset=large';
export const DEFAULT_LOCALE = 'en';
// TODO: replace DEV_API and PROD_API with your dev and prod API urls.
// export const DEV_API = 'https://demo.dingpack.store';
// export const PROD_API = 'https://demo.dingpack.store';
export const DEV_API = 'http://192.168.1.32:3001';
export const PROD_API = 'http://192.168.1.32:3001';
export const LOCAL_API = 'http://192.168.1.32:3001';
