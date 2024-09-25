import { component$ } from '@builder.io/qwik';
import { useDocumentHead, useLocation } from '@builder.io/qwik-city';
import { DEFAULT_METADATA_TITLE } from '~/constants';
import { generateDocumentHead } from '~/utils';

export const Head = component$(() => {
	const documentHead = useDocumentHead();
	const head =
		documentHead.meta.length > 0 ? documentHead : { ...documentHead, ...generateDocumentHead() };
	const loc = useLocation();

	return (
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="theme-color" content="#1D4ED8" />
			<title>{head.title || DEFAULT_METADATA_TITLE}</title>

			<link rel="manifest" href="/manifest.json" />
			<link rel="apple-touch-icon" href="/logo-192-192.png" />
			<link rel="preconnect" href="https://www.buylits.com" />
			<link rel="canonical" href={loc.url.toString()} />

			{head.meta.map((m, key) => (
				<meta key={key} {...m} />
			))}

			{head.links.map((l, key) => (
				<link key={key} {...l} />
			))}

			{head.styles.map((s, key) => {
				const restProps = { ...s.props };
				const dangerouslySetInnerHTML = s.props?.dangerouslySetInnerHTML;
				if (dangerouslySetInnerHTML) {
					restProps.dangerouslySetInnerHTML = dangerouslySetInnerHTML;
				}
				return <style key={key} {...restProps} />;
			})}

			<meta name="description" content="BuyLits Online Store" />
		</head>
	);
});
