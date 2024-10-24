import { component$ } from '@builder.io/qwik';

export const MauticScript = component$(() => {
	return (
		<script
			dangerouslySetInnerHTML={`
        if (typeof MauticSDKLoaded == 'undefined') {
            var MauticSDKLoaded = true;
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://emautic.saa9vi.com/media/js/mautic-form.js?v1a4d446b';
            script.onload = function() {
                MauticSDK.onLoad();
            };
            head.appendChild(script);
            var MauticDomain = 'https://emautic.saa9vi.com';
            var MauticLang = {
                'submittingMessage': 'Please wait...'
            };
        } else if (typeof MauticSDK != 'undefined') {
            MauticSDK.onLoad();
        }
      `}
		/>
	);
});
