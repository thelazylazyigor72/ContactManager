import React, {
	Suspense,
	useCallback,
	useDeferredValue,
	useEffect,
	useMemo,
	useReducer,
} from "react";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import Loading from "../components/Loading";
import PageTransitioner from "../components/PageTransitioner";
import Pagination from "../components/Pagination";
import Person from "../components/Person";
import getContactsGroups from "../utils/getContactsGroups";
import { INITIAL_STATE, reducer } from "../utils/dashboardReducer";
import Searchbar from "../components/Searchbar";
import FilterButtons from "../components/FilterButtons";

export async function loader() {
	const response = await fetch(
		`http://localhost:${process.env.REACT_APP_PORT}/api/getAllContacts`,
		{
			method: "GET",
			credentials: "include",
		},
	);
	const data = await response.json();
	if (!data.success) throw new Error(data.errorMessage);
	// from loaded data im calc set of groups and assign it to data
	const groupsFilterButtons = getContactsGroups(data.data.contacts);
	data.groupsFilterButtons = groupsFilterButtons;
	return data;
}

const Dashboard = () => {
	const navigation = useNavigation();

	// get data from loader
	const {
		data: { contacts },
		groupsFilterButtons,
	} = useLoaderData();

	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

	// protection, just incase yn
	// also added suspence below
	// also just in case
	const defferedShow = useDeferredValue(state.showedContacts);

	const memoContacts = useMemo(() => {
		return contacts;
	}, [contacts]);

	// assign loader data to state
	useEffect(() => {
		dispatch({ type: "SET_CONTACTS", payload: memoContacts });
	}, [memoContacts]);

	// note: pointless to memo dep arr
	useEffect(() => {
		// calc number of contacts to show in general
		// and assign it tot state
		const firstPageIndex = (state.currentPage - 1) * 12;
		const lastPageIndex = firstPageIndex + 12;
		const contactsToShow = state?.filteredContacts?.slice(
			firstPageIndex,
			lastPageIndex,
		);
		dispatch({ type: "SET_SHOWED_CONTACTS", payload: contactsToShow });
	}, [state.filteredContacts, state.currentPage]);

	// pointless to memoize those three
	const handleNextPage = () => {
		dispatch({ type: "SET_NEXT_PAGE" });
	};
	const handlePrevPage = () => {
		dispatch({ type: "SET_PREVIOUS_PAGE" });
	};
	const handleSetPage = (page) => {
		dispatch({ type: "SET_PAGE", payload: page });
	};

	// to memoize searchbar
	const inputHandler = useCallback(
		(e) => {
			dispatch({
				type: "INPUT_CHANGE",
				payload: {
					key: "search",
					value: e.target.value,
				},
			});
		},
		[dispatch],
	);

	// to memoize searchbar
	const memoInputValue = useMemo(() => {
		return state.search;
	}, [state.search]);

	// to memoize filterbtns
	const filterHandler = useCallback(
		(group) => {
			dispatch({ type: "SET_GROUP", payload: group });
		},
		[dispatch],
	);

	// to memoize filterbtns
	const memoFilterButtons = useMemo(() => {
		return groupsFilterButtons;
	}, [groupsFilterButtons]);

	// loading case
	if (navigation.state === "loading") {
		return <Loading size="screen" />;
	}

	return (
		<PageTransitioner>
			<div className="h-full max-h-fit min-h-screen w-full p-2 pt-16 fx_col-center_center lg:px-12 lg:pb-10 lg:pt-16">
				<div className="w-9/12 fx-between_center 3xl:fx-evenly_center">
					<Searchbar inputHandler={inputHandler} inputValue={memoInputValue} />
					<FilterButtons
						filterHandler={filterHandler}
						btnsArray={memoFilterButtons}
					/>
				</div>
				<Suspense fallback={<Loading size="full" />}>
					<div className="grid h-fit w-9/12 grow-[2] grid-cols-1 items-center justify-items-center gap-4 rounded-2xl border-l border-t border-solid border-day_text p-4 dark:border-night_primary md:grid-cols-2 lg:w-11/12 lg:grid-cols-3  xl:w-full xl:grid-cols-4 3xl:w-7/12 3xl:grid-cols-4">
						{contacts?.length === 0 ? (
							<h1 className="self-center text-center font-kanit text-4xl font-normal text-day_text dark:text-night_text">
								Sorry, still empty
							</h1>
						) : (
							defferedShow?.map((contact) => {
								return (
									<Link
										key={contact["_id"]}
										to={`/dashboard/contact/${contact["_id"]}`}
										className="relative"
									>
										<Person contact={contact} />
									</Link>
								);
							})
						)}
					</div>
				</Suspense>
				<Pagination
					className="my-10 grow gap-4 fx-center_center md:my-0 lg:my-10"
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
