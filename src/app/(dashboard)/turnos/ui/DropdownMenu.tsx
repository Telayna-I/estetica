"use client";
import { deleteTreatment, finishTreatment } from "@/actions";
import Link from "next/link";
import { useState } from "react";
import { CgMoreVerticalO } from "react-icons/cg";
import { FaCheck, FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";

interface Props {
	treatmentId: string;
}

export const DropdownMenu = ({ treatmentId }: Props) => {
	const [isCollapsed, setIsCollapsed] = useState(false);

	const handleDelete = async () => {
		const result = await Swal.fire({
			title: "¿Estás seguro?",
			text: "Esta acción no se puede deshacer.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Eliminar",
			cancelButtonText: "Cancelar",
		});

		if (result.isConfirmed) {
			await deleteTreatment(treatmentId);
			Swal.fire("Eliminado!", "El turno ha sido eliminado.", "success");
			window.location.reload();
		}
	};

	const handleFinish = async () => {
		const result = await Swal.fire({
			title: "¿Estás seguro?",
			text: "¿Quieres marcar este turno como finalizado?",
			icon: "info",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Finalizar",
			cancelButtonText: "Cancelar",
		});

		if (result.isConfirmed) {
			await finishTreatment(treatmentId);
			Swal.fire("¡Finalizado!", "El turno ha sido marcado como finalizado.", "success");
			window.location.reload();
		}
	};

	return (
		<div className='bg-gray-100 flex items-center justify-center '>
			<div className='relative inline-block text-left'>
				<CgMoreVerticalO
					className='cursor-pointer transition-all hover:text-gray-700 bg-transparent'
					onClick={() => setIsCollapsed(!isCollapsed)}
				/>

				<div
					className={`origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 ${
						isCollapsed ? "visible" : "hidden"
					}`}>
					<div className='py-2 p-2' aria-labelledby='dropdown-button'>
						<Link
							href={`/turnos/editar-turno/${treatmentId}`}
							onClick={() => setIsCollapsed(!isCollapsed)}
							className='flex w-full items-center rounded-md px-4 py-2 mb-1 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer'>
							<FiEdit className='h-4 w-4 mr-2' />
							<span className='text-sm'>Editar</span>
						</Link>
						<button
							onClick={handleFinish}
							className='flex items-center w-full  rounded-md px-4 py-2 mb-1  font-semibold text-green-400 hover:bg-green-400 hover:text-white hover:border-green-500 cursor-pointer'
							role='menuitem'>
							<FaCheck className='h-4 w-4 mr-2' />
							<span className='text-sm'>Finalizado</span>
						</button>
						<button
							onClick={handleDelete}
							className='flex items-center w-full  rounded-md px-4 py-2  font-semibold text-rosa_vibrante hover:bg-rosa_vibrante hover:text-white hover:border-rosa_vibrante cursor-pointer'
							role='menuitem'>
							<FaTrash className='h-4 w-4 mr-2' />
							<span className='text-sm'>Eliminar</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
