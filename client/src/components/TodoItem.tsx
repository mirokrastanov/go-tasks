import { Badge, Box, Flex, Spinner, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Todo } from "./TodoList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BACKEND_URL } from "../App";

const TodoItem = ({ todo }: { todo: Todo }) => {
	const queryClient = useQueryClient();
	const { colorMode, toggleColorMode } = useColorMode();

	const { mutate: updateTodo, isPending: isUpdating } = useMutation({
		mutationKey: ['updateTodo'],
		mutationFn: async () => {
			if (todo.completed) return alert('Todo is already completed');

			await new Promise(resolve => setTimeout(resolve, 500)); //sim loading delay

			try {
				const res = await fetch(`${BACKEND_URL}/todos/${todo._id}`, {
					method: 'PATCH',

				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || 'Failed to mark todo as completed');
				}
				return data;
			} catch (error) {
				console.log(error);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] });
		},
	});

	const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
		mutationKey: ['deleteTodo'],
		mutationFn: async () => {
			await new Promise(resolve => setTimeout(resolve, 500)); //sim loading delay

			try {
				const res = await fetch(`${BACKEND_URL}/todos/${todo._id}`, {
					method: 'DELETE',
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || 'Failed to delete todo');
				}
				return data;
			} catch (error) {
				console.log(error);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] });
		},
	});

	return (
		<Flex gap={2} alignItems={"center"}>
			<Flex
				flex={1}
				alignItems={"center"}
				border={"1px"}
				borderColor={"gray.600"}
				p={2}
				borderRadius={"lg"}
				justifyContent={"space-between"}
				bg={useColorModeValue("gray.400", "gray.700")}
			>
				<Text
					color={todo.completed ? "green.200" : "yellow.100"}
					textDecoration={todo.completed ? "line-through" : "none"}
				>
					{todo.body}
				</Text>
				{todo.completed && (
					<Badge ml='1' colorScheme='green'>
						Done
					</Badge>
				)}
				{!todo.completed && (
					<Badge ml='1' colorScheme='yellow'>
						In Progress
					</Badge>
				)}
			</Flex>
			<Flex gap={2} alignItems={"center"}>
				<Box color={"green.500"} cursor={"pointer"} onClick={() => updateTodo()}>
					{!isUpdating && <FaCheckCircle size={20} />}
					{isUpdating && <Spinner size={'sm'} />}
				</Box>
				<Box color={"red.500"} cursor={"pointer"} onClick={() => deleteTodo()}>
					{!isDeleting && <MdDelete size={25} />}
					{isDeleting && <Spinner size={'sm'} />}
				</Box>
			</Flex>
		</Flex>
	);
};
export default TodoItem;
