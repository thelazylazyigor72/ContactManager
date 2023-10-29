import React, { useId, useEffect, useReducer } from "react";
import { Link, useLoaderData } from "react-router-dom";
import PageTransitioner from "../components/PageTransitioner";
import Pagination from "../components/Pagination";
import Person from "../components/Person";
import getContactsGroups from "../utils/getContactsGroups";
import { INITIAL_STATE, reducer } from "../utils/dashboardReducer";

export async function loader() {
	const response = await fetch("http://localhost:8082/api/getAllContacts", {
		method: "GET",
		credentials: "include",
	});
	const data = await response.json();
	if (data.errorMessage) throw new Error(data.errorMessage);
	const groupsFilterButtons = getContactsGroups(data.data.contacts);
	data.groupsFilterButtons = groupsFilterButtons;
	return data;
}

// todo анимации всего
// todo стейт страницы, стейт данных и стейт инпута может вынести в редукс ? раз уж это об одной странице все
const Dashboard = () => {
	// get data from loader
	const {
		data: { contacts },
		groupsFilterButtons,
	} = useLoaderData();
	// намеренно не делаю отсчет странц устойчивым к перезагрузке страницы
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

	// assign it to state
	useEffect(() => {
		dispatch({ type: "SET_CONTACTS", payload: contacts });
	}, [contacts]);

	const id = useId();

	useEffect(() => {
		const firstPageIndex = (state.currentPage - 1) * 12;
		const lastPageIndex = firstPageIndex + 12;
		const contactsToShow = state?.filteredContacts?.slice(
			firstPageIndex,
			lastPageIndex,
		);
		dispatch({ type: "SET_SHOWED_CONTACTS", payload: contactsToShow });
	}, [state.filteredContacts, state.currentPage]);

	const handleNextPage = () => {
		dispatch({ type: "SET_NEXT_PAGE" });
	};
	const handlePrevPage = () => {
		dispatch({ type: "SET_PREVIOUS_PAGE" });
	};
	const handleSetPage = (page) => {
		dispatch({ type: "SET_PAGE", payload: page });
	};

	return (
		<PageTransitioner>
			<div className="h-full max-h-fit min-h-screen w-full p-2 pt-16 fx_col-center_center lg:h-screen lg:px-12 lg:pb-10">
				<div className="w-9/12 fx-between_center">
					<div className="group relative z-0 mb-6 w-full border-b  border-solid border-day_text dark:border-night_text md:w-fit lg:px-12">
						<input
							type="text"
							name={id}
							id={id}
							value={state.search}
							className="peer block w-full appearance-none border-0 border-b-2 border-day_text bg-transparent px-0 py-2.5 font-prompt text-sm text-day_text focus:outline-none focus:ring-0 dark:border-night_text dark:text-night_text"
							placeholder=" "
							onChange={(e) => {
								dispatch({
									type: "INPUT_CHANGE",
									payload: {
										key: "search",
										value: e.target.value,
									},
								});
							}}
						/>
						<label
							htmlFor={id}
							className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform font-prompt text-base text-day_text duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-light dark:text-night_text"
						>
							Search contacts
						</label>
					</div>
					<div className="hidden gap-x-4 md:fx-center_center">
						{groupsFilterButtons.map((group) => {
							return (
								<button
									className="border border-solid border-slate-950"
									type="button"
									onClick={() =>
										dispatch({ type: "SET_GROUP", payload: group })
									}
								>
									{group}
								</button>
							);
						})}
					</div>
				</div>
				<div className="grid h-fit w-9/12 grow-[2] grid-cols-1 items-center justify-items-center gap-4 rounded-2xl border-l border-t border-solid border-flowerly p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6">
					{contacts?.length === 0
						? "Sorry, still empty"
						: state?.showedContacts?.map((contact) => {
								return (
									<Link
										key={contact["_id"]}
										to={`/dashboard/contact/${contact["_id"]}`}
									>
										<Person contact={contact} />
									</Link>
								);
						  })}
				</div>
				<Pagination
					className="my-10 grow fx-center_center md:my-0"
					currentPage={state?.currentPage}
					totalCount={state?.filteredContacts?.length}
					pageSize={12}
					handleNextPage={handleNextPage}
					handlePrevPage={handlePrevPage}
					handleSetPage={handleSetPage}
				/>
			</div>
		</PageTransitioner>
	);
};

export default Dashboard;
