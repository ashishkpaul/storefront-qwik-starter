import { createContextId } from '@builder.io/qwik';
import { AppState } from './types';

export const APP_STATE = createContextId<AppState>('app_state');
export const AUTH_TOKEN = 'authToken';
export const CUSTOMER_NOT_DEFINED_ID = 'CUSTOMER_NOT_DEFINED_ID';
export const HEADER_AUTH_TOKEN_KEY = 'vendure-auth-token';
export const IMAGE_RESOLUTIONS = [1000, 800, 600, 400];
export const HOMEPAGE_IMAGE =
	'https://cloud.dingpack.com/apps/sharingpath/ashish@dingpack.com/Desktop/Pictures/dingpack/storefront/qwik/homepage.webp';
export const DEFAULT_METADATA_URL = 'https://qwik-storefront.vendure.io/';
export const DEFAULT_METADATA_TITLE = 'Saa9vi Online Serices';
export const DEFAULT_METADATA_DESCRIPTION = 'Dingpack Local City Online Store';
export const DEFAULT_METADATA_IMAGE = 'https://qwik-storefront.vendure.io/social-image.png';
export const DEFAULT_LOCALE = 'en';
// TODO: replace DEV_API and PROD_API with your dev and prod API urls.
export const DEV_API = 'https://ecom.saa9vi.com';
export const PROD_API = 'http://localhost:3000';
export const LOCAL_API = 'http://localhost:3000';

export const PORT = '3010';
export const HOST = 'localhost';
