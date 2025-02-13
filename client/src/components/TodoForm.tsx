import { Button, Flex, Input, Spinner } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { BACKEND_URL } from "../App";

const TodoForm = () => {
	const [newTodo, setNewTodo] = useState("");
	const [isPending, setIsPending] = useState(false);
	const queryClient = useQueryClient();

	const { mutate: createTodo, isPending: isCreating } = useMutation({
		mutationKey: ['createTodo'],
		mutationFn: async (e: React.FormEvent) => {
			e.preventDefault();

			await new Promise(resolve => setTimeout(resolve, 500)); //sim loading delay

			try {
				const res = await fetch(`${BACKEND_URL}/todos`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ body: newTodo }),
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || 'Error creating todo');
				}
				setNewTodo('');
				return data;
			} catch (error: any) {
				throw new Error('');
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] });
		},
		onError: (error: any) => {
			alert(error.message || 'Failed to create todo');
		}
	});

	return (
		<form onSubmit={createTodo}>
			<Flex gap={2}>
				<Input
					type='text'
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					ref={(input) => {
						if (input) input.focus();
					}}
				/>
				<Button
					mx={2}
					type='submit'
					_active={{
						transform: "scale(.97)",
					}}
				>
					{isCreating ? <Spinner size={"xs"} /> : <IoMdAdd size={30} />}
				</Button>
			</Flex>
		</form>
	);
};
export default TodoForm;
