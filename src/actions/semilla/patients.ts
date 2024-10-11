"use server";
import prisma from "@/app/lib/prisma";
import { Gender, Role } from "@prisma/client";
import bcryptjs from "bcryptjs";

const seedPatients = [
	{
		name: "Kaitlyn Risdall",
		phone: "(271) 9415042",
		gender: "woman" as Gender,
		age: 41,
		allergies: null,
		takeMedicine: null,
		recentTreatment: null,
		observations: null,
	},
	{
		name: "Arline Bavridge",
		phone: "(431) 9144643",
		gender: "woman" as Gender,
		age: 65,
		allergies: null,
		takeMedicine: null,
		recentTreatment: null,
		observations: null,
	},
	{
		name: "Miquela Klimp",
		phone: "(391) 6209220",
		gender: "woman" as Gender,
		age: 28,
		allergies: null,
		takeMedicine: null,
		recentTreatment: null,
		observations: null,
	},
	{
		name: "Eamon Jiggle",
		phone: "(741) 1449730",
		gender: "man" as Gender,
		age: 24,
		allergies: null,
		takeMedicine: null,
		recentTreatment: null,
		observations: null,
	},
	{
		name: "Guss Kikke",
		phone: "(556) 6704345",
		gender: "man" as Gender,
		age: 33,
		allergies: null,
		takeMedicine: null,
		recentTreatment: null,
		observations: null,
	},
	{
		name: "Gusty Totaro",
		phone: "(435) 2045552",
		gender: "man" as Gender,
		age: 73,
		allergies: null,
		takeMedicine: null,
		recentTreatment: null,
		observations: null,
	},
	{
		name: "Vite Bandt",
		phone: "(910) 8872496",
		gender: "man" as Gender,
		age: 19,
		allergies: null,
		takeMedicine: null,
		recentTreatment: null,
		observations: null,
	},
	{
		name: "York Gowdie",
		phone: "(994) 4032508",
		gender: "man" as Gender,
		age: 70,
		allergies: null,
		takeMedicine: null,
		recentTreatment: null,
		observations: null,
	},
	{
		name: "Alisun Gilgryst",
		phone: "(587) 6868218",
		gender: "woman" as Gender,
		age: 32,
		allergies: null,
		takeMedicine: null,
		recentTreatment: null,
		observations: null,
	},
	{
		name: "Emmalynne O'Cahill",
		phone: "(120) 7897176",
		gender: "man" as Gender,
		age: 82,
		allergies: null,
		takeMedicine: null,
		recentTreatment: null,
		observations: null,
	},
	{
		name: "Wilt Muat",
		phone: "(580) 1804099",
		gender: "man" as Gender,
		age: 53,
		allergies: null,
		takeMedicine: null,
		recentTreatment: null,
		observations: null,
	},
	{
		name: "Cal Molines",
		phone: "(670) 8895420",
		gender: "woman" as Gender,
		age: 29,
		allergies: null,
		takeMedicine: null,
		recentTreatment: null,
		observations: null,
	},
	{
		name: "Hubie Beade",
		phone: "(979) 1248981",
		gender: "woman" as Gender,
		age: 60,
		allergies: null,
		takeMedicine: null,
		recentTreatment: null,
		observations: null,
	},
	{
		name: "Nettie Skelly",
		phone: "(453) 4355264",
		gender: "woman" as Gender,
		age: 32,
		allergies: null,
		takeMedicine: null,
		recentTreatment: null,
		observations: null,
	},
	{
		name: "Lonni Ziemens",
		phone: "(326) 6973666",
		gender: "woman" as Gender,
		age: 71,
		allergies: null,
		takeMedicine: null,
		recentTreatment: null,
		observations: null,
	},
	{
		name: "North Scibsey",
		phone: "(850) 6705664",
		gender: "man" as Gender,
		age: 72,
		allergies: null,
		takeMedicine: null,
		recentTreatment: null,
		observations: null,
	},
	{
		name: "Karie Devine",
		phone: "(696) 1880244",
		gender: "woman" as Gender,
		age: 21,
		allergies: null,
		takeMedicine: null,
		recentTreatment: null,
		observations: null,
	},
	{
		name: "Thatch O' Sullivan",
		phone: "(237) 9289577",
		gender: "man" as Gender,
		age: 55,
		allergies: null,
		takeMedicine: null,
		recentTreatment: null,
		observations: null,
	},
	{
		name: "Halsey Escalero",
		phone: "(938) 8952013",
		gender: "man" as Gender,
		age: 61,
		allergies: null,
		takeMedicine: null,
		recentTreatment: null,
		observations: null,
	},
	{
		name: "Eward Svanini",
		phone: "(678) 5172960",
		gender: "man" as Gender,
		age: 40,
		allergies: null,
		takeMedicine: null,
		recentTreatment: null,
		observations: null,
	},
];

export const createPatients = async () => {
	try {
		const newPatient = await prisma.patient.createMany({ data: seedPatients });

		return {
			ok: true,
			newPatient,
		};
	} catch (error) {
		console.log(error);
	}
};

const seedUsers = [
	{
		name: "Leandro Magnaterra",
		email: "LeandroMagnaterra@gmail.com",
		password: bcryptjs.hashSync("123456"),
		role: "doctor" as Role,
		// name: "Leandro Magnaterra",
	},
	{
		name: "secretario",
		email: "secretario@gmail.com",
		password: bcryptjs.hashSync("123456"),
		role: "secretary" as Role,
	},
];

export const createUsers = async () => {
	try {
		const users = await prisma.user.createMany({ data: seedUsers });
		return {
			ok: true,
			users,
		};
	} catch (error) {
		console.log(error);
	}
};

export const newTreatment = async (patientId: string, userId: string) => {
	try {
		const newTreatment = await prisma.treatment.create({
			data: {
				todo: "Botox",
				price: 500,
				date: new Date().toString(),
				hour: "17:00",
				userId,
				patientId,
			},
		});
		console.log(newTreatment);
		return {
			ok: true,
			newTreatment,
		};
	} catch (error) {
		console.log(error);
	}
};

export const getTreatmentsFromPatient = async (patientId: string) => {
	try {
		const treatments = await prisma.treatment.findMany({ where: { patientId } });
		console.log(treatments);
	} catch (error) {
		console.log(error);
	}
};

export const getPatientAndTreatments = async (patientId: string) => {
	try {
		const allTreatments = await prisma.patient.findMany({
			where: { id: patientId },
			include: { Treatment: true },
		});

		return allTreatments;

		console.log(allTreatments);
	} catch (error) {}
};
