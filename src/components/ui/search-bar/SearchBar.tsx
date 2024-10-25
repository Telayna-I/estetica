"use client";
import React, { FormEvent, useState } from "react";
import { patientSearch } from "@/actions";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useSearchStore } from "@/store";
import { useRouter } from "next/navigation";

export const SearchBar = () => {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");
	const setSearchResults = useSearchStore((state) => state.setSearchResults);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const { patient } = await patientSearch(searchTerm);
		setSearchResults(patient);
		router.replace("/pacientes/busqueda");
	};

	const handleInputChange = (searchTerm: string) => {
		setSearchTerm(searchTerm);
	};

	const handleClear = async () => {
		setSearchTerm("");
	};

	return (
		<form
			onSubmit={(e) => handleSubmit(e)}
			className='relative mt-3'
			role='search'
			aria-label='Site search'>
			<input
				type='text'
				value={searchTerm}
				onChange={(e) => handleInputChange(e.target.value)}
				placeholder='Search...'
				className='w-full py-2 pl-10 pr-10 text-sm text-gray-700 bg-white border border-gray-300 rounded outline-none focus:border-blue-500 transition-all '
				aria-label='Search input'
			/>
			<button
				type='button'
				className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 focus:outline-none transition-colors duration-300'
				aria-label='Submit search'>
				<FaSearch className='h-4 w-4 ' />
			</button>
			{searchTerm && (
				<button
					type='button'
					onClick={handleClear}
					className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 focus:outline-none transition-colors duration-300'
					aria-label='Clear search'>
					<FaTimes className='h-4 w-4 sm:h-5 sm:w-5' />
				</button>
			)}
		</form>
	);
};
