import { createContextId } from '@builder.io/qwik';
import { AppState } from './types';

export const APP_STATE = createContextId<AppState>('app_state');
export const AUTH_TOKEN = 'authToken';
export const CUSTOMER_NOT_DEFINED_ID = 'CUSTOMER_NOT_DEFINED_ID';
export const HEADER_AUTH_TOKEN_KEY = 'vendure-auth-token';
export const IMAGE_RESOLUTIONS = [1000, 800, 600, 400];
export const HOMEPAGE_IMAGE = '/homepage.webp';
// 'http://localhost:3000/assets/source/ea/shutterstock_461355724.jpg?format=webp';
// 'http://localhost:3000/assets/source/52/unpacking_online_purchases_on_couch_with_dog_1301968473.jpg?format=webp';
export const DEFAULT_METADATA_URL = 'https://www.saa9vi.com/';
export const DEFAULT_METADATA_TITLE = 'Saa9vi Online Serices';
export const DEFAULT_METADATA_DESCRIPTION =
	'S9-Ecom: Control, Connect And Grow Your E-commerce Empire';
export const DEFAULT_METADATA_IMAGE = '/social-image.png';
export const DEFAULT_LOCALE = 'en';
// TODO: replace DEV_API and PROD_API with your dev and prod API urls.
export const DEV_API = 'http://192.168.1.32:3001';
// export const PROD_API = 'https://ecom.saa9vi.com';
export const PROD_API = 'http://192.168.1.32:3001';
export const LOCAL_API = 'http://192.168.1.32:3001';

export const PORT = '3010';
export const HOST = 'localhost';
