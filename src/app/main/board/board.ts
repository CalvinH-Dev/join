import { CommonModule, ViewportScroller } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AddTaskForm } from "@main/add-task/add-task-form/add-task-form";
import { BoardView } from "@main/board/board-view/board-view";

@Component({
	selector: "app-board",
	imports: [CommonModule, BoardView, AddTaskForm],
	templateUrl: "./board.html",
	styleUrl: "./board.scss",
})
export class Board {
	/**
	 * Indicates whether the task detail view is currently open.
	 * @default false
	 */
	isTaskViewOpen = false;

	/**
	 * Indicates whether the add task overlay is currently visible.
	 * @default false
	 */
	addTaskOverlayOpen = false;

	/**
	 * Defines the category where the new task will be added.
	 * Can be one of: "todo", "in-progress", "awaiting-feedback", or "done".
	 * @default "todo"
	 */
	categoryToAdd: "todo" | "in-progress" | "awaiting-feedback" | "done" = "todo";

	/** Angular ViewportScroller service instance for managing scroll position. */
	vps = inject(ViewportScroller);

	/** Provides access to the current route information. */
	route = inject(ActivatedRoute);

	/** Angular Router instance for navigation. */
	router = inject(Router);

	/**
	 * Opens the task detail view.
	 * Sets {@link isTaskViewOpen} to `true`.
	 */
	openTaskView() {
		this.isTaskViewOpen = true;
	}

	/**
	 * Handles the "Add Task" button click.
	 * Opens the add task overlay for the given category.
	 * @param {"todo" | "in-progress" | "awaiting-feedback" | "done"} category - The task category to add to.
	 */
	onAddTaskClicked(category: "todo" | "in-progress" | "awaiting-feedback" | "done") {
		this.categoryToAdd = category;
		this.addTaskOverlayOpen = true;
	}

	/**
	 * Called when the add task overlay requests to close.
	 * Invokes the {@link closeAddTask} method.
	 */
	onCloseAddTask() {
		this.closeAddTask();
	}

	/**
	 * Called when a new task has been successfully added.
	 * Closes the add task overlay.
	 */
	onTaskAdded() {
		this.closeAddTask();
	}

	/**
	 * Closes the add task overlay.
	 * Sets {@link addTaskOverlayOpen} to `false`.
	 * @private
	 */
	private closeAddTask() {
		this.addTaskOverlayOpen = false;
	}
}
