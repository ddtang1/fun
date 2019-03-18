// Define Income Input Variables
var filing_status = "single";
var filing_status_full = "Single";
var base_income;
var base_income_no_withholding;
var cash_bonus;
var cash_bonus_supplemental_withholding = false;
var issue_date_vested_stock;
var year_end_vested_stock;
var issue_date_string;
var issue_date_year;
var issue_date_month;
var issue_date_day;
var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var available_years = [2019];
var stock_issue_value;
var stock_issue_value_fixed = false;
var stock_sell_percentage;
var stock_sell_value;
var stock_sell_value_fixed = false;

// Define Tax Variables
var fed_ss_tax_rate = 6.20;
var fed_medicare_tax_rate = 1.45;
var fed_medicare_supplemental_tax_rate = 0.90;
var fed_ss_max_income_limit = [];
fed_ss_max_income_limit["single"] = 132900;
fed_ss_max_income_limit["mfj"] = 265800;
fed_ss_max_income_limit["hoh"] = 132900;
var fed_medicare_min_supplemental_start = 200000;
var fed_medicare_min_supplemental_start = [];
fed_medicare_min_supplemental_start["single"] = 200000;
fed_medicare_min_supplemental_start["mfj"] = 250000;
fed_medicare_min_supplemental_start["hoh"] = 200000;
var fed_supplemental_withholding_rate = 22.00;
var fed_supplemental_high_start = 1000000;
var fed_supplemental_high_withholding_rate = 37.00;
var state_withholding_rate = 10.23;
var local_withholding_rate = 1.16;
var fed_deductions;
var fed_standard_deduction = [];
fed_standard_deduction["single"] = 12200;
fed_standard_deduction["mfj"] = 24400;
fed_standard_deduction["hoh"] = 18000;
var state_deductions;
var state_standard_deduction = [];
state_standard_deduction["single"] = 4401;
state_standard_deduction["mfj"] = 8802;
state_standard_deduction["hoh"] = 8802;

// Define Estimate Variables
var stock_issue_multipliers = [10,50,100,150,200];
var stock_issue_estimates = [];
var stock_issue_estimate_string = "10.00%, 50.00%, 100.00%, 150.00%, and 200.00%";
var stock_issue_estimate_string_short = "10.00%, 50.00%, 100.00%, 150.00%, 200.00%";
var stock_sell_multipliers = [0,50,100,150,200];
var stock_sell_estimates = [];
var stock_sell_estimate_string = "0.00%, 50.00%, 100.00%, 150.00%, and 200.00%";
var stock_sell_estimate_string_short = "0.00%, 50.00%, 100.00%, 150.00%, 200.00%";

// Define Variables to Compute
var current_date = new Date();
var paychecks_paid_at_issue;
var base_income_at_issue;
var fed_stock_subject_to_ss_withholding;
var fed_stock_below_medicare_min_supplemental_start;

var fed_cash_withholding_base;
var fed_cash_withholding_ss;
var fed_cash_withholding_medicare;
var fed_cash_withholding_bonus;
var fed_cash_withholding_total;
var state_cash_withholding_base;
var state_cash_withholding_bonus;
var state_cash_withholding_total;
var local_cash_withholding;

// Define Scenario Variables
var max_scenarios = 25;
var scenarios = [];
var stock_issue = [];
var capital_gains = [];
var taxable_income = [];
var fed_withholding = [];
var state_withholding = [];
var local_withholding = [];
var fed_stock_withholding_base = [];
var fed_stock_withholding_ss = [];
var fed_stock_withholding_medicare = [];
var fed_stock_withholding_total = [];
var state_stock_withholding = [];
var local_stock_withholding = [];
var fed_tax = [];
var state_tax = [];
var local_tax = [];
var fed_tax_outstanding = [];
var state_tax_outstanding = [];
var local_tax_outstanding = [];
var scenario_a = [0,5,10,15,20];
var scenario_b = [1,6,11,16,21];
var scenario_c = [2,7,12,17,22];
var scenario_d = [3,8,13,18,23];
var scenario_e = [4,9,14,19,24];

// Define Tax Brackets
var fed_tax_bracket_single = [];
fed_tax_bracket_single[0] = [0,10.00];
fed_tax_bracket_single[1] = [9700.00,12.00];
fed_tax_bracket_single[2] = [39475.00,22.00];
fed_tax_bracket_single[3] = [84200.00,24.00];
fed_tax_bracket_single[4] = [160725.00,32.00];
fed_tax_bracket_single[5] = [204100.00,35.00];
fed_tax_bracket_single[6] = [510300.00,37.00];

var fed_tax_bracket_mfj = [];
fed_tax_bracket_mfj[0] = [0,10.00];
fed_tax_bracket_mfj[1] = [19400.00,12.00];
fed_tax_bracket_mfj[2] = [78950.00,22.00];
fed_tax_bracket_mfj[3] = [168400.00,24.00];
fed_tax_bracket_mfj[4] = [321450.00,32.00];
fed_tax_bracket_mfj[5] = [408200.00,35.00];
fed_tax_bracket_mfj[6] = [612351.00,37.00];

var fed_tax_bracket_hoh = [];
fed_tax_bracket_hoh[0] = [0,10.00];
fed_tax_bracket_hoh[1] = [13850.00,12.00];
fed_tax_bracket_hoh[2] = [52850.00,22.00];
fed_tax_bracket_hoh[3] = [84200.00,24.00];
fed_tax_bracket_hoh[4] = [160700.00,32.00];
fed_tax_bracket_hoh[5] = [204100.00,35.00];
fed_tax_bracket_hoh[6] = [510300.00,37.00];

var state_tax_bracket_single = [];
state_tax_bracket_single[0] = [0,1.0];
state_tax_bracket_single[1] = [8544.00,2.00];
state_tax_bracket_single[2] = [20255.00,3.00];
state_tax_bracket_single[3] = [31969.00,4.00];
state_tax_bracket_single[4] = [44377.00,8.00];
state_tax_bracket_single[5] = [56085.00,9.30];
state_tax_bracket_single[6] = [286492.00,10.30];
state_tax_bracket_single[7] = [343788.00,11.30];
state_tax_bracket_single[8] = [572980.00,12.30];

var state_tax_bracket_mfj = [];
state_tax_bracket_mfj[0] = [0,1.0];
state_tax_bracket_mfj[1] = [17088.00,2.00];
state_tax_bracket_mfj[2] = [40510.00,4.00];
state_tax_bracket_mfj[3] = [63938.00,6.00];
state_tax_bracket_mfj[4] = [88754.00,8.00];
state_tax_bracket_mfj[5] = [112170.00,9.30];
state_tax_bracket_mfj[6] = [572984.00,10.30];
state_tax_bracket_mfj[7] = [687576.00,11.30];
state_tax_bracket_mfj[8] = [1145960.00,12.30];

var state_tax_bracket_hoh = [];
state_tax_bracket_hoh[0] = [0,1.0];
state_tax_bracket_hoh[1] = [17099.00,2.00];
state_tax_bracket_hoh[2] = [40512.00,3.00];
state_tax_bracket_hoh[3] = [52224.00,4.00];
state_tax_bracket_hoh[4] = [64632.00,8.00];
state_tax_bracket_hoh[5] = [76343.00,9.30];
state_tax_bracket_hoh[6] = [389627.00,10.30];
state_tax_bracket_hoh[7] = [467553.00,11.30];
state_tax_bracket_hoh[8] = [779253.00,12.30];

// User Interface Functions
function exitPage() {
	// If do not agree to disclaimer, redirect to another website
	window.location.replace("https://www.youtube.com/watch?v=VJhsjUPDulw");
}
function showDisclaimer() {
	// Hide all other cards and show disclaimer when clicked
	$("#disclaimer_card").collapse("show");
	$("#input_card").collapse("hide");
	$("#summary_cards").collapse("hide");
	//for (i = 0; i < max_scenarios; i++) { $("#scenario" + i).collapse("hide"); }
	for (i = 0; i < max_scenarios; i++) { $(".scenario" + i).collapse("hide"); }
	for (i = 0; i < scenario_a.length; i++ ) { $("#scenario_set_" + scenario_a[i]).collapse("hide"); }
	$("#scenario_cards").collapse("hide");
}
function agreeToDisclaimer() {
	// Move from disclaimer to input card when clicked
	$("#disclaimer_card").collapse("hide");
	$("#input_card").collapse("show");
	//for (i = 0; i < max_scenarios; i++) { $("#scenario" + i).collapse("hide"); }
	for (i = 0; i < max_scenarios; i++) { $(".scenario" + i).collapse("hide"); }
	for (i = 0; i < scenario_a.length; i++ ) { $("#scenario_set_" + scenario_a[i]).collapse("hide"); }
}
function changeInputs() {
	// Show input card only to change inputs when clicked
	$("#input_card").collapse("show");
	$("#summary_cards").collapse("hide");
	//for (i = 0; i < max_scenarios; i++) { $("#scenario" + i).collapse("hide"); }
	for (i = 0; i < max_scenarios; i++) { $(".scenario" + i).collapse("hide"); }
	for (i = 0; i < scenario_a.length; i++ ) { $("#scenario_set_" + scenario_a[i]).collapse("hide"); }
	$("#scenario_cards").collapse("hide");
}
function resetInputForm() {
	// Reset the form to defaults when clicked
	document.getElementById("input_form").reset();
}
function randomlySetInputValues() {
	document.getElementById("base_income").value = 120000;
	document.getElementById("base_income_no_withholding").value = 1000;
	document.getElementById("cash_bonus").value = 10000;
	document.getElementById("rsus_vested_at_issue").value = 2250;
	document.getElementById("rsus_vested_at_year_end").value = 2500;
	document.getElementById("price_issue_estimate").value = 75;
	document.getElementById("rsus_sold").value = 25;
	document.getElementById("price_sale_estimate").value = 78;
}
function setDeductions() {
	// If filing status changes, set the federal and state deductions if they haven't been changed or are lower than the new standard deduction
	var current_status = document.getElementById("filing_status").value;
	var previous_status = document.getElementById("filing_status_previous").value;
	var current_fed_deductions = input_to_int(document.getElementById("federal_deductions").value);
	var current_state_deductions = input_to_int(document.getElementById("state_deductions").value);
	if (current_status != previous_status) {
		if (current_fed_deductions == fed_standard_deduction[previous_status] || fed_standard_deduction[current_status] > current_fed_deductions) {
			document.getElementById("federal_deductions").value = fed_standard_deduction[current_status];
		}
		if (current_state_deductions == state_standard_deduction[previous_status] || state_standard_deduction[current_status] > current_state_deductions) {
			document.getElementById("state_deductions").value = state_standard_deduction[current_status];
		}
		document.getElementById("filing_status_previous").value = current_status;
	}
}
function analyzeTaxes() {
	// Get and Parse Variables from Input Form
	filing_status = document.getElementById("filing_status").value;
	if (filing_status == "mfj") { filing_status_full = "Married Filing Jointly"; }
	else if (filing_status == "hoh") { filing_status_full = "Head of Household"; }
	else { filing_status_full = "Single"; }
	base_income = input_to_int(document.getElementById("base_income").value);
	base_income_no_withholding = input_to_int(document.getElementById("base_income_no_withholding").value);
	cash_bonus = input_to_int(document.getElementById("cash_bonus").value);
	fed_deductions = input_to_int(document.getElementById("federal_deductions").value);
	state_deductions = input_to_int(document.getElementById("state_deductions").value);
	fed_supplemental_withholding_rate = input_to_float(document.getElementById("federal_supplemental_withholding").value);
	state_withholding_rate = input_to_float(document.getElementById("state_supplemental_withholding").value);
	local_withholding_rate = input_to_float(document.getElementById("local_withholding").value);
	issue_date_vested_stock = input_to_int(document.getElementById("rsus_vested_at_issue").value);
	year_end_vested_stock = input_to_int(document.getElementById("rsus_vested_at_year_end").value);
	var issue_date = new Date(document.getElementById("issue_date").value);
	console.log(issue_date.toUTCString());
	stock_issue_value = input_to_int(document.getElementById("price_issue_estimate").value);
	stock_sell_percentage = input_to_float(document.getElementById("rsus_sold").value);
	stock_sell_value = input_to_int(document.getElementById("price_sale_estimate").value);
	if (document.getElementById("price_issue_final").checked) { stock_issue_value_fixed = true; }
	else { stock_issue_value_fixed = false; }
	if (document.getElementById("price_sale_final").checked) { stock_sell_value_fixed = true; } 
	else { stock_sell_value_fixed = false; }

	// Run data validation and return errors if any. If none, proceed.
	if (! available_years.includes(issue_date.getUTCFullYear())) {
		// If date is not in 2019, throw error
		$("#date_alert").collapse("show");
	} else if (fed_deductions < fed_standard_deduction[filing_status] || state_deductions < state_standard_deduction[filing_status]) {
		// If any of the deductions are below the standard deduction, throw error
		$("#deduction_alert").collapse("show");
	} else if (fed_supplemental_withholding_rate < 0 || state_withholding_rate < 0 || local_withholding_rate < 0 || stock_sell_percentage < 0 || fed_supplemental_withholding_rate > 100 || state_withholding_rate > 100 || local_withholding_rate > 100 || stock_sell_percentage > 100) {
		// If any of the percentages are not between 0 and 100, throw error
		$("#percentage_alert").collapse("show");
	} else {
		// Hide all alerts
		$("#date_alert").collapse("hide");
		$("#deduction_alert").collapse("hide");
		$("#percentage_alert").collapse("hide");

		// Calculate Income at Vest Date
		if(issue_date.getUTCDate() < 15) {
			paychecks_paid_at_issue = 1 + (issue_date.getUTCMonth() * 2);
			base_income_at_issue = (paychecks_paid_at_issue / 52) * base_income;
		} else {
			paychecks_paid_at_issue = (1+ issue_date.getUTCMonth()) * 2;
			base_income_at_issue = (paychecks_paid_at_issue / 52) * base_income;
		}
		fed_stock_subject_to_ss_withholding = fed_ss_max_income_limit - base_income_at_issue;
		fed_stock_below_medicare_min_supplemental_start = fed_medicare_min_supplemental_start - base_income_at_issue;

		// Calculate Base Income and Cash Bonus Withholding
		fed_cash_withholding_base = calculateFedBaseTax(base_income - fed_deductions, filing_status);
		fed_cash_withholding_ss = calculateFedSocialSecurityTax(base_income, filing_status);
		fed_cash_withholding_medicare = calculateFedMedicareTax(base_income, filing_status);
		fed_cash_withholding_bonus = calculateFedSupplementalWithholding(cash_bonus, fed_supplemental_withholding_rate) + calculateFedSocialSecurityTax(cash_bonus, filing_status) + calculateFedMedicareTax(cash_bonus, filing_status);
		fed_cash_withholding_total = fed_cash_withholding_base + fed_cash_withholding_ss + fed_cash_withholding_medicare + fed_cash_withholding_bonus;
		state_cash_withholding_base = calculateStateTax(base_income - state_deductions, filing_status);
		state_cash_withholding_bonus = Math.round(cash_bonus * (state_withholding_rate / 100.00));
		state_cash_withholding_total = state_cash_withholding_base + state_cash_withholding_bonus;
		local_cash_withholding = Math.round((base_income + cash_bonus) * (local_withholding_rate / 100.00));
		//console.log(fed_cash_withholding_base + ", " + fed_cash_withholding_ss + ", " + fed_cash_withholding_medicare + ", " + fed_cash_withholding_bonus + ", " + fed_cash_withholding_total)

		// Create Stock Valuation Estimates and Scenarios
		stock_issue_estimates.length = 0;
		stock_issue_estimates = [];
		stock_sell_estimates.length = 0;
		stock_sell_estimates = [];
		scenarios.length = 0;
		scenarios = [];
		if (stock_issue_value_fixed) { stock_issue_estimates[0] = stock_issue_value; }
		else { for (i = 0; i < stock_issue_multipliers.length; i++) { stock_issue_estimates[i] = (stock_issue_multipliers[i] / 100.00) * stock_issue_value; } }
		if (stock_sell_value_fixed) { stock_sell_estimates[0] = stock_sell_value; }
		else { for (i = 0; i < stock_sell_multipliers.length; i++) { stock_sell_estimates[i] = (stock_sell_multipliers[i] / 100.00) * stock_sell_value; } }
		var scenario_num = 0;
		for (i = 0; i < stock_issue_estimates.length; i++) {
			for(k = 0; k < stock_sell_estimates.length; k++) {
				scenarios[scenario_num] = [stock_issue_estimates[i], stock_sell_estimates[k]];
				scenario_num++;
			}
		}

		// Calculate Income and Taxes Under Scenarios
		stock_issue.length = 0;
		stock_issue = [];
		capital_gains.length = 0;
		capital_gains = [];
		taxable_income.length = 0;
		taxable_income = [];
		fed_tax.length = 0;
		fed_tax = [];
		state_tax.length = 0;
		state_tax = [];
		local_tax.length = 0;
		local_tax = [];
		fed_stock_withholding_base.length = 0;
		fed_stock_withholding_base = [];
		fed_stock_withholding_ss.length = 0;
		fed_stock_withholding_ss = [];
		fed_stock_withholding_medicare.length = 0;
		fed_stock_withholding_medicare = [];
		fed_stock_withholding_total.length = 0;
		fed_stock_withholding_total = [];
		fed_withholding.length = 0;
		fed_withholding = [];
		state_stock_withholding.length = 0;
		state_stock_withholding = [];
		state_withholding.length = 0;
		state_withholding = [];
		local_stock_withholding.length = 0;
		local_stock_withholding = [];
		local_withholding.length = 0;
		local_withholding = [];
		fed_tax_outstanding.length = 0;
		fed_tax_outstanding = [];
		state_tax_outstanding.length = 0;
		state_tax_outstanding = [];
		local_tax_outstanding.length = 0;
		local_tax_outstanding = [];
		for (n = 0; n < scenarios.length; n++) {
			// Compute Income
			stock_issue[n] = scenarios[n][0] * (year_end_vested_stock);
			capital_gains[n] = Math.max(0, Math.round(Math.round(year_end_vested_stock * (stock_sell_percentage / 100.00)) * (scenarios[n][1] - scenarios[n][0])));
			taxable_income[n] = base_income + base_income_no_withholding + cash_bonus + stock_issue[n] + capital_gains[n];

			// Compute Taxes Owed
			fed_tax[n] = calculateFedBaseTax((taxable_income[n] - fed_deductions), filing_status) + calculateFedSocialSecurityTax(taxable_income[n], filing_status) + calculateFedMedicareTax(taxable_income[n], filing_status);
			state_tax[n] = calculateStateTax((taxable_income[n] - state_deductions), filing_status);
			local_tax[n] = calculateLocalTax(base_income + cash_bonus + stock_issue[n]);

			//console.log(n + ": " + taxable_income[n] + ", " + fed_deductions + ", " + filing_status);

			// Compute Withholding
			fed_stock_withholding_base[n] = calculateFedSupplementalWithholding((cash_bonus + stock_issue[n]), fed_supplemental_withholding_rate) - fed_cash_withholding_bonus;
			if ((base_income_at_issue + cash_bonus) < fed_ss_max_income_limit[filing_status]) {
				if (stock_issue[n] > (fed_ss_max_income_limit[filing_status] - base_income_at_issue - cash_bonus)) { fed_stock_withholding_ss[n] = calculateFedSocialSecurityTax(fed_ss_max_income_limit[filing_status] - base_income_at_issue - cash_bonus); }
				else { fed_stock_withholding_ss[n] = calculateFedSocialSecurityTax(stock_issue[n]); }
			} else { fed_stock_withholding_ss[n] = 0; }
			if ((base_income_at_issue + cash_bonus) > fed_medicare_min_supplemental_start[filing_status]) { fed_stock_withholding_medicare[n] = calculateFedMedicareSupplementalTax(stock_issue[n]); }
			else { fed_stock_withholding_medicare[n] = calculateFedMedicareTax(fed_medicare_min_supplemental_start[filing_status] - base_income_at_issue - cash_bonus) + calculateFedMedicareSupplementalTax(Math.max(0,stock_issue[n] - fed_medicare_min_supplemental_start[filing_status] - base_income_at_issue - cash_bonus)); }
			//console.log(n + ": " + fed_stock_withholding_base[n] + ", " + fed_stock_withholding_ss[n] + ", " + fed_stock_withholding_medicare[n]);
			fed_stock_withholding_total[n] = fed_stock_withholding_base[n] + fed_stock_withholding_ss[n] + fed_stock_withholding_medicare[n];
			fed_withholding[n] = fed_cash_withholding_total + fed_stock_withholding_total[n];
			state_stock_withholding[n] = Math.round(stock_issue[n] * (state_withholding_rate / 100.00));
			state_withholding[n] = state_cash_withholding_total + state_stock_withholding[n];
			local_stock_withholding[n] = Math.round(stock_issue[n] * (local_withholding_rate / 100.00));
			local_withholding[n] = local_cash_withholding + local_stock_withholding[n];

			// Compute Outstanding Taxes
			fed_tax_outstanding[n] = fed_tax[n] - fed_withholding[n];
			state_tax_outstanding[n] = state_tax[n] - state_withholding[n];
			local_tax_outstanding[n] = local_tax[n] - local_withholding[n];
		}

		// Populate Summary Cards
		document.getElementById("summary_filing_status").textContent = filing_status_full;
		document.getElementById("summary_income_withholding").textContent = thousands_separators(base_income);
		document.getElementById("summary_income_no_withholding").textContent = thousands_separators(base_income_no_withholding);
		document.getElementById("summary_cash_bonus").textContent = thousands_separators(cash_bonus);
		document.getElementById("summary_fed_deductions").textContent = thousands_separators(fed_deductions);
		document.getElementById("summary_state_deductions").textContent = thousands_separators(state_deductions);
		document.getElementById("summary_fed_supplemental_withholding").textContent = fed_supplemental_withholding_rate.toFixed(2) + "%";
		document.getElementById("summary_state_supplemental_withholding").textContent = state_withholding_rate.toFixed(2) + "%";
		document.getElementById("summary_local_withholding").textContent = local_withholding_rate.toFixed(2) + "%";
		document.getElementById("summary_issue_date").textContent = months[issue_date.getUTCMonth()] + " " + issue_date.getUTCDate();
		document.getElementById("summary_earned_rsus_issue").textContent = thousands_separators(issue_date_vested_stock);
		document.getElementById("summary_earned_rsus_year_end").textContent = thousands_separators(year_end_vested_stock);
		document.getElementById("summary_issue_price").textContent = "$" + stock_issue_value;
		if (stock_issue_value_fixed) { document.getElementById("summary_issue_estimators").textContent = "100%" }
		else { document.getElementById("summary_issue_estimators").textContent = stock_issue_estimate_string_short; }
		document.getElementById("summary_sell_price").textContent = "$" + stock_sell_value;
		if (stock_sell_value_fixed) { document.getElementById("summary_sell_estimators").textContent = "100%" }
		else { document.getElementById("summary_sell_estimators").textContent = stock_issue_estimate_string_short; }
		document.getElementById("summary_sell_percentage").textContent = stock_sell_percentage.toFixed(2) + "%";

		// Populate and show Scenario Cards
		for (i = 0; i < scenarios.length; i++) {
			// Populate Basis and Income
			if (stock_sell_value_fixed) {
				if (scenario_a.includes(i)) {
					document.getElementById("scenario_title_" + i).textContent = "A: Issue @ $" + thousands_separators(scenarios[i][0].toFixed(2));
					document.getElementById("overall_scenario_title_" + i).textContent = "Scenario " + ((i/5)+1) + ": Sell @ $" + thousands_separators(scenarios[i][1].toFixed(2)); 
				} else if (scenario_b.includes(i)) { document.getElementById("scenario_title_" + i).textContent = "B: Issue @ $" + thousands_separators(scenarios[i][0].toFixed(2)); }
				else if (scenario_c.includes(i)) { document.getElementById("scenario_title_" + i).textContent = "C: Issue @ $" + thousands_separators(scenarios[i][0].toFixed(2)); }
				else if (scenario_d.includes(i)) { document.getElementById("scenario_title_" + i).textContent = "D: Issue @ $" + thousands_separators(scenarios[i][0].toFixed(2)); }
				else if (scenario_e.includes(i)) { document.getElementById("scenario_title_" + i).textContent = "E: Issue @ $" + thousands_separators(scenarios[i][0].toFixed(2)); }
			} else {
				if (scenario_a.includes(i)) {
					document.getElementById("scenario_title_" + i).textContent = "A: Sell @ $" + thousands_separators(scenarios[i][1].toFixed(2));
					if (stock_issue_value_fixed) { document.getElementById("overall_scenario_title_" + i).textContent = "Scenario " + ((i/5)+1) + ": Issue @ $" + thousands_separators(scenarios[i][0].toFixed(2)); }
					else { document.getElementById("overall_scenario_title_" + i).textContent = "Scenario " + ((i/5)+1) + ": Issue @ $" + thousands_separators(scenarios[i][0].toFixed(2)) + " (" + stock_issue_multipliers[(i/5)] + "%)"; }
				} else if (scenario_b.includes(i)) { document.getElementById("scenario_title_" + i).textContent = "B: Sell @ $" + thousands_separators(scenarios[i][1].toFixed(2)); }
				else if (scenario_c.includes(i)) { document.getElementById("scenario_title_" + i).textContent = "C: Sell @ $" + thousands_separators(scenarios[i][1].toFixed(2)); }
				else if (scenario_d.includes(i)) { document.getElementById("scenario_title_" + i).textContent = "D: Sell @ $" + thousands_separators(scenarios[i][1].toFixed(2)); }
				else if (scenario_e.includes(i)) { document.getElementById("scenario_title_" + i).textContent = "E: Sell @ $" + thousands_separators(scenarios[i][1].toFixed(2)); }
			}
			document.getElementById("cash_bonus_" + i).textContent = thousands_separators(base_income + base_income_no_withholding);
			document.getElementById("stock_" + i).textContent = thousands_separators(stock_issue[i]);
			document.getElementById("capital_gains_" + i).textContent = thousands_separators(capital_gains[i]);
			document.getElementById("taxable_income_" + i).textContent = thousands_separators(taxable_income[i]);

			// Populate Taxes and Withholding
			document.getElementById("fed_tax_" + i).textContent = thousands_separators(fed_tax[i]);
			document.getElementById("state_tax_" + i).textContent = thousands_separators(state_tax[i]);
			document.getElementById("local_tax_" + i).textContent = thousands_separators(local_tax[i]);
			document.getElementById("fed_withholding_" + i).textContent = thousands_separators(fed_withholding[i]);
			document.getElementById("state_withholding_" + i).textContent = thousands_separators(state_withholding[i]);
			document.getElementById("local_withholding_" + i).textContent = thousands_separators(local_withholding[i]);

			// Populate Outstanding Taxes Owed
			document.getElementById("fed_tax_owed_" + i).textContent = thousands_separators(fed_tax_outstanding[i]);
			document.getElementById("state_tax_owed_" + i).textContent = thousands_separators(state_tax_outstanding[i]);
			document.getElementById("local_tax_owed_" + i).textContent = thousands_separators(local_tax_outstanding[i]);

			// Show scenario cards
			// $("#scenario" + i).collapse("show");
			$(".scenario" + i).collapse("show");
			if (scenario_a.includes(i)) { $("#scenario_set_" + i).collapse("show"); }
		}

		// Show summary and scenario cards, hide input card
		$("#input_card").collapse("hide");
		$("#summary_cards").collapse("show");
		$("#scenario_cards").collapse("show");
	}
}
function openCustomization() {
	// Show customization card only to change inputs when clicked
	$("#input_card").collapse("hide");
	$("#customize_card").collapse("show");
	$("#summary_cards").collapse("hide");
	for (i = 0; i < max_scenarios; i++) { $(".scenario" + i).collapse("hide"); }
	for (i = 0; i < scenario_a.length; i++ ) { $("#scenario_set_" + scenario_a[i]).collapse("hide"); }
	$("#scenario_cards").collapse("hide");
}
function resetCustomizeForm() {
	// Reset the form to defaults when clicked
	document.getElementById("customize_form").reset();
}
function setCustomization() {
	// Get and Parse Variables from the Customization Form
	for (i = 0; i < stock_issue_multipliers.length; i++) {
		stock_issue_multipliers[i] = input_to_float(document.getElementById("issue" + i).value);
	}
	for (i = 0; i < stock_sell_multipliers.length; i++) {
		stock_sell_multipliers[i] = input_to_float(document.getElementById("sale" + i).value);
	}
	
	// Update estimator descriptions
	for (i = 0; i < stock_issue_multipliers.length; i++) {
		if (i == 0) { 
			stock_issue_estimate_string = stock_issue_multipliers[i].toFixed(2) + "%";
			stock_issue_estimate_string_short = stock_issue_multipliers[i].toFixed(2) + "%"; 
		}
		else if ((i + 1) == stock_issue_multipliers.length) { 
			stock_issue_estimate_string = stock_issue_estimate_string + ", and " + stock_issue_multipliers[i].toFixed(2) + "%"; 
			stock_issue_estimate_string_short = ", " + stock_issue_multipliers[i].toFixed(2) + "%"; 
		}
		else { 
			stock_issue_estimate_string = stock_issue_estimate_string + ", " + stock_issue_multipliers[i].toFixed(2) + "%"; 
			stock_issue_estimate_string_short = ", " + stock_issue_multipliers[i].toFixed(2) + "%"; 
		}
	}
	for (i = 0; i < stock_sell_multipliers.length; i++) {
		if (i == 0) { 
			stock_sell_estimate_string = stock_sell_multipliers[i].toFixed(2) + "%"; 
			stock_sell_estimate_string_short = stock_issue_multipliers[i].toFixed(2) + "%"; 
		}
		else if ((i + 1) == stock_sell_multipliers.length) { 
			stock_sell_estimate_string = stock_sell_estimate_string + ", and " + stock_sell_multipliers[i].toFixed(2) + "%"; 
			stock_sell_estimate_string_short = ", " + stock_issue_multipliers[i].toFixed(2) + "%";
		}
		else { 
			stock_sell_estimate_string = stock_sell_estimate_string + ", " + stock_sell_multipliers[i].toFixed(2) + "%"; 
			stock_sell_estimate_string_short = ", " + stock_issue_multipliers[i].toFixed(2) + "%";
		}
	}
	document.getElementById("issue_estimate_note").textContent = "I'll calculate " + stock_issue_estimate_string + " scenarios based on this estimate.";
	document.getElementById("sale_estimate_note").textContent = "I'll calculate " +stock_sell_estimate_string + " scenarios based on this estimate.";

	// Show input card, hide customization card
	$("#input_card").collapse("show");
	$("#customize_card").collapse("hide");
}

// Helper Functions
function input_to_int(n) {
	// Parse input as integer. If not a number, return 0.
	var x = Math.round(parseFloat(n));
	x = parseInt(x);
	if (isNaN(x)) { return 0; }
	else { return x; }
}
function input_to_float(n) {
	// Parse input as float. If not a number, return 0.
	var x = parseFloat(n);
	if (isNaN(x)) { return 0; }
	else { return x; }
}
function thousands_separators(n) {
	// Add comma separators for every 3 digit for a given number
	var n_parts = n.toString().split(".");
    n_parts[0] = n_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return n_parts.join(".");
}

// Federal Tax Computations
function calculateFedBaseTax(y,fs) {
	var taxes_owed = 0;
	if (fs == "single") {
		for(i = 0; i < fed_tax_bracket_single.length; i++) {
			if (i+1 == fed_tax_bracket_single.length && y >= fed_tax_bracket_single[i][0]) {
				taxes_owed = taxes_owed + ((y - fed_tax_bracket_single[i][0]) * (fed_tax_bracket_single[i][1]/100.00));
				fed_tax_bracket_num = i;
			} else if (i+1 < fed_tax_bracket_single.length && y >= fed_tax_bracket_single[i][0] && y < fed_tax_bracket_single[i+1][0]) {
				taxes_owed = taxes_owed + ((y - fed_tax_bracket_single[i][0]) * (fed_tax_bracket_single[i][1]/100.00));
				fed_tax_bracket_num = i;
			} else if (i+1 < fed_tax_bracket_single.length && y >= fed_tax_bracket_single[i][0] && y >= fed_tax_bracket_single[i+1][0]) {
				taxes_owed = taxes_owed + ((fed_tax_bracket_single[i+1][0] - fed_tax_bracket_single[i][0]) * (fed_tax_bracket_single[i][1]/100.00));
			}
		}

	} else if (fs == "mfj") {
		for(i = 0; i < fed_tax_bracket_mfj.length; i++) {
			if (i+1 == fed_tax_bracket_mfj.length && y >= fed_tax_bracket_mfj[i][0]) {
				taxes_owed = taxes_owed + ((y - fed_tax_bracket_mfj[i][0]) * (fed_tax_bracket_mfj[i][1]/100.00));
				fed_tax_bracket_num = i;
			} else if (i+1 < fed_tax_bracket_mfj.length && y >= fed_tax_bracket_mfj[i][0] && y < fed_tax_bracket_mfj[i+1][0]) {
				taxes_owed = taxes_owed + ((y - fed_tax_bracket_mfj[i][0]) * (fed_tax_bracket_mfj[i][1]/100.00));
				fed_tax_bracket_num = i;
			} else if (i+1 < fed_tax_bracket_mfj.length && y >= fed_tax_bracket_mfj[i][0] && y >= fed_tax_bracket_mfj[i+1][0]) {
				taxes_owed = taxes_owed + ((fed_tax_bracket_mfj[i+1][0] - fed_tax_bracket_mfj[i][0]) * (fed_tax_bracket_mfj[i][1]/100.00));
			}
		}
	} else if (fs == "hoh") {
		for(i = 0; i < fed_tax_bracket_hoh.length; i++) {
			if (i+1 == fed_tax_bracket_hoh.length && y >= fed_tax_bracket_hoh[i][0]) {
				taxes_owed = taxes_owed + ((y - fed_tax_bracket_hoh[i][0]) * (fed_tax_bracket_hoh[i][1]/100.00));
				fed_tax_bracket_num = i;
			} else if (i+1 < fed_tax_bracket_hoh.length && y >= fed_tax_bracket_hoh[i][0] && y < fed_tax_bracket_hoh[i+1][0]) {
				taxes_owed = taxes_owed + ((y - fed_tax_bracket_hoh[i][0]) * (fed_tax_bracket_hoh[i][1]/100.00));
				fed_tax_bracket_num = i;
			} else if (i+1 < fed_tax_bracket_hoh.length && y >= fed_tax_bracket_hoh[i][0] && y >= fed_tax_bracket_hoh[i+1][0]) {
				taxes_owed = taxes_owed + ((fed_tax_bracket_hoh[i+1][0] - fed_tax_bracket_hoh[i][0]) * (fed_tax_bracket_hoh[i][1]/100.00));
			}
		}
	}
	taxes_owed = Math.round(taxes_owed);
	return taxes_owed;
}
function calculateFedSocialSecurityTax(y,fs) {
	var taxes_owed = 0;
	if (y > fed_ss_max_income_limit[fs]) {
		taxes_owed = fed_ss_max_income_limit[fs] * (fed_ss_tax_rate / 100.00);
	} else {
		taxes_owed = y * (fed_ss_tax_rate / 100.00);
	}
	taxes_owed = Math.round(taxes_owed);
	return taxes_owed;
}
function calculateFedMedicareTax(y,fs) {
	var taxes_owed = 0;
	if (y > fed_medicare_min_supplemental_start[fs]) {
		taxes_owed = (fed_medicare_min_supplemental_start[fs] * (fed_medicare_tax_rate / 100.00)) + ((y - fed_medicare_min_supplemental_start[fs]) * ((fed_medicare_tax_rate + fed_medicare_supplemental_tax_rate) / 100.00));
	} else {
		taxes_owed = y * (fed_medicare_tax_rate / 100.00);
	}
	taxes_owed = Math.round(taxes_owed);
	return taxes_owed;
}
function calculateFedMedicareSupplementalTax(y) {
	return Math.round(y * (fed_medicare_tax_rate / 100.00));
}
function calculateFedSupplementalWithholding(y,r) {
	if(y > fed_supplemental_high_start) {
		return Math.round(((y - fed_supplemental_high_start) * (fed_supplemental_high_withholding_rate / 100.00)) + (fed_supplemental_high_start * (r / 100.00)));
	} else {
		return Math.round(y * (r / 100.00));
	}
}

// State Tax Computation
function calculateStateTax(y,fs) {
	var taxes_owed = 0;
	state_tax_bracket_num = 0;
	if (fs == "single") {
		for(i = 0; i < state_tax_bracket_single.length; i++) {
			if (i+1 == state_tax_bracket_single.length && y >= state_tax_bracket_single[i][0]) {
				taxes_owed = taxes_owed + ((y - state_tax_bracket_single[i][0]) * (state_tax_bracket_single[i][1]/100.00));
				state_tax_bracket_num = i;
			} else if (i+1 < state_tax_bracket_single.length && y >= state_tax_bracket_single[i][0] && y < state_tax_bracket_single[i+1][0]) {
				taxes_owed = taxes_owed + ((y - state_tax_bracket_single[i][0]) * (state_tax_bracket_single[i][1]/100.00));
				state_tax_bracket_num = i;
			} else if (i+1 < state_tax_bracket_single.length && y >= state_tax_bracket_single[i][0] && y >= state_tax_bracket_single[i+1][0]) {
				taxes_owed = taxes_owed + ((state_tax_bracket_single[i+1][0] - state_tax_bracket_single[i][0]) * (state_tax_bracket_single[i][1]/100.00));
			}
		}

	} else if (fs == "mfj") {
		for(i = 0; i < state_tax_bracket_mfj.length; i++) {
			if (i+1 == state_tax_bracket_mfj.length && y >= state_tax_bracket_mfj[i][0]) {
				taxes_owed = taxes_owed + ((y - state_tax_bracket_mfj[i][0]) * (state_tax_bracket_mfj[i][1]/100.00));
				state_tax_bracket_num = i;
			} else if (i+1 < state_tax_bracket_mfj.length && y >= state_tax_bracket_mfj[i][0] && y < state_tax_bracket_mfj[i+1][0]) {
				taxes_owed = taxes_owed + ((y - state_tax_bracket_mfj[i][0]) * (state_tax_bracket_mfj[i][1]/100.00));
				state_tax_bracket_num = i;
			} else if (i+1 < state_tax_bracket_mfj.length && y >= state_tax_bracket_mfj[i][0] && y >= state_tax_bracket_mfj[i+1][0]) {
				taxes_owed = taxes_owed + ((state_tax_bracket_mfj[i+1][0] - state_tax_bracket_mfj[i][0]) * (state_tax_bracket_mfj[i][1]/100.00));
			}
		}
	} else if (fs == "hoh") {
		for(i = 0; i < state_tax_bracket_hoh.length; i++) {
			if (i+1 == state_tax_bracket_hoh.length && y >= state_tax_bracket_hoh[i][0]) {
				taxes_owed = taxes_owed + ((y - state_tax_bracket_hoh[i][0]) * (state_tax_bracket_hoh[i][1]/100.00));
				state_tax_bracket_num = i;
			} else if (i+1 < state_tax_bracket_hoh.length && y >= state_tax_bracket_hoh[i][0] && y < state_tax_bracket_hoh[i+1][0]) {
				taxes_owed = taxes_owed + ((y - state_tax_bracket_hoh[i][0]) * (state_tax_bracket_hoh[i][1]/100.00));
				state_tax_bracket_num = i;
			} else if (i+1 < state_tax_bracket_hoh.length && y >= state_tax_bracket_hoh[i][0] && y >= state_tax_bracket_hoh[i+1][0]) {
				taxes_owed = taxes_owed + ((state_tax_bracket_hoh[i+1][0] - state_tax_bracket_hoh[i][0]) * (state_tax_bracket_hoh[i][1]/100.00));
			}
		}
	}
	taxes_owed = Math.round(taxes_owed);
	return taxes_owed;
}

// Local Tax Computation
function calculateLocalTax(y) {
	var taxes_owed = y * (local_withholding_rate / 100.00);
	taxes_owed = Math.round(taxes_owed);
	return taxes_owed;
}