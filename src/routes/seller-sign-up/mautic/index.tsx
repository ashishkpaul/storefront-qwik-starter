import { component$ } from '@builder.io/qwik';
import { MauticScript } from './emautic'; // Path to where you saved the Mautic script component

export default component$(() => {
	return (
		<div class="p-8 bg-gray-50 min-h-screen">
			<div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 ">
				<h1 class="text-4xl font-bold text-gray-900 mb-4">Seller E-Sign Up</h1>
				<p>Welcome to the seller sign-up page!</p>
			</div>

			{/* Inject Mautic Script */}
			<MauticScript />

			{/* Inject Custom Styles for Mautic Form */}
			<style
				dangerouslySetInnerHTML={`
          .mauticform_wrapper { max-width: 600px; margin: 10px auto; }
          .mauticform-innerform {}
          .mauticform-post-success {}
          .mauticform-name { font-weight: bold; font-size: 1.5em; margin-bottom: 3px; }
          .mauticform-description { margin-top: 2px; margin-bottom: 10px; }
          .mauticform-error { margin-bottom: 10px; color: red; }
          .mauticform-message { margin-bottom: 10px; color: green; }
          .mauticform-row { display: block; margin-bottom: 20px; }
          .mauticform-label { font-size: 1.1em; display: block; font-weight: bold; margin-bottom: 5px; }
          .mauticform-row.mauticform-required .mauticform-label:after { color: #e32; content: " *"; display: inline; }
          .mauticform-helpmessage { display: block; font-size: 0.9em; margin-bottom: 3px; }
          .mauticform-errormsg { display: block; color: red; margin-top: 2px; }
          .mauticform-selectbox, .mauticform-input, .mauticform-textarea { width: 100%; padding: 0.5em 0.5em; border: 1px solid #CCC; background: #fff; border-radius: 4px; box-sizing: border-box; }
          .mauticform-button-wrapper .mauticform-button, .mauticform-pagebreak-wrapper .mauticform-pagebreak { display: inline-block; font-weight: 600; padding: 6px 12px; border-radius: 3px; }
          .mauticform-button-wrapper .mauticform-button.btn-default[disabled] { background-color: #ffffff; border-color: #dddddd; opacity: 0.75; cursor: not-allowed; }
          .mauticform-pagebreak-wrapper .mauticform-button-wrapper { display: inline; }
        `}
			/>

			{/* Mautic Form */}
			<div id="mauticform_wrapper_buylits" class="mauticform_wrapper">
				<form
					autocomplete="off"
					role="form"
					method="post"
					action="https://emautic.saa9vi.com/form/submit?formId=4"
					id="mauticform_buylits"
					data-mautic-form="buylits"
					enctype="multipart/form-data"
				>
					<div class="mauticform-error" id="mauticform_buylits_error"></div>
					<div class="mauticform-message" id="mauticform_buylits_message"></div>
					<div class="mauticform-innerform">
						<div class="mauticform-page-wrapper mauticform-page-1" data-mautic-form-page="1">
							<div
								id="mauticform_buylits_shopname"
								class="mauticform-row mauticform-text mauticform-field-1 mauticform-required"
								data-validate="shopname"
								data-validation-type="text"
							>
								<label
									id="mauticform_label_buylits_shopname"
									for="mauticform_input_buylits_shopname"
									class="mauticform-label"
								>
									Shop Name
								</label>
								<input
									type="text"
									name="mauticform[shopname]"
									id="mauticform_input_buylits_shopname"
									class="mauticform-input"
								/>
								<span class="mauticform-errormsg" style="display:none;">
									This is a required Field
								</span>
							</div>

							<div
								id="mauticform_buylits_first_name"
								class="mauticform-row mauticform-text mauticform-field-2 mauticform-required"
								data-validate="first_name"
								data-validation-type="text"
							>
								<label
									id="mauticform_label_buylits_first_name"
									for="mauticform_input_buylits_first_name"
									class="mauticform-label"
								>
									First Name
								</label>
								<input
									type="text"
									name="mauticform[first_name]"
									id="mauticform_input_buylits_first_name"
									class="mauticform-input"
								/>
								<span class="mauticform-errormsg" style="display:none;">
									This is a required Field
								</span>
							</div>

							<div
								id="mauticform_buylits_last_name"
								class="mauticform-row mauticform-text mauticform-field-3 mauticform-required"
								data-validate="last_name"
								data-validation-type="text"
							>
								<label
									id="mauticform_label_buylits_last_name"
									for="mauticform_input_buylits_last_name"
									class="mauticform-label"
								>
									Last Name
								</label>
								<input
									type="text"
									name="mauticform[last_name]"
									id="mauticform_input_buylits_last_name"
									class="mauticform-input"
								/>
								<span class="mauticform-errormsg" style="display:none;">
									This is a required Field
								</span>
							</div>

							<div
								id="mauticform_buylits_email_address"
								class="mauticform-row mauticform-email mauticform-field-4 mauticform-required"
								data-validate="email_address"
								data-validation-type="email"
							>
								<label
									id="mauticform_label_buylits_email_address"
									for="mauticform_input_buylits_email_address"
									class="mauticform-label"
								>
									Email Address
								</label>
								<input
									type="email"
									name="mauticform[email_address]"
									id="mauticform_input_buylits_email_address"
									class="mauticform-input"
								/>
								<span class="mauticform-errormsg" style="display:none;">
									This is a required Field
								</span>
							</div>

							<div
								id="mauticform_buylits_password"
								class="mauticform-row mauticform-password mauticform-field-5 mauticform-required"
								data-validate="password"
								data-validation-type="password"
							>
								<label
									id="mauticform_label_buylits_password"
									for="mauticform_input_buylits_password"
									class="mauticform-label"
								>
									Password
								</label>
								<input
									type="password"
									name="mauticform[password]"
									id="mauticform_input_buylits_password"
									class="mauticform-input"
								/>
								<span class="mauticform-errormsg" style="display:none;">
									This is a required Field
								</span>
							</div>

							<div
								id="mauticform_buylits_confirm_password"
								class="mauticform-row mauticform-password mauticform-field-6 mauticform-required"
								data-validate="confirm_password"
								data-validation-type="password"
							>
								<label
									id="mauticform_label_buylits_confirm_password"
									for="mauticform_input_buylits_confirm_password"
									class="mauticform-label"
								>
									Confirm Password
								</label>
								<input
									type="password"
									name="mauticform[confirm_password]"
									id="mauticform_input_buylits_confirm_password"
									class="mauticform-input"
								/>
								<span class="mauticform-errormsg" style="display:none;">
									This is a required Field
								</span>
							</div>

							<div
								id="mauticform_buylits_submit"
								class="mauticform-row mauticform-button-wrapper mauticform-field-7"
							>
								<button
									type="submit"
									name="mauticform[submit]"
									id="mauticform_input_buylits_submit"
									value=""
									class="mauticform-button btn btn-default"
								>
									Submit
								</button>
							</div>
						</div>
					</div>

					<input type="hidden" name="mauticform[formId]" id="mauticform_buylits_id" value="4" />
					<input type="hidden" name="mauticform[return]" id="mauticform_buylits_return" value="" />
					<input
						type="hidden"
						name="mauticform[formName]"
						id="mauticform_buylits_name"
						value="buylits"
					/>
				</form>
			</div>
		</div>
	);
});
