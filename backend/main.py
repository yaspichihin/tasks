import uvicorn
from uuid import uuid4, UUID
from dataclasses import dataclass, field
from fastapi import FastAPI, status, HTTPException
from pydantic import BaseModel, ConfigDict


# Storages
tasks = [
    {
        "uuid": "74f8c197-5e85-4788-8070-276ceccc0e25",
        "title": "some task",
        "completed": False,
    }
]


# Schemas
class STaskBase(BaseModel):
    title: str
    completed: bool = False


class STaskCreate(STaskBase):
    pass


class STaskUpdate(STaskBase):
    pass


class STask(STaskBase):
    model_config = ConfigDict(from_attributes=True)
    uuid: str


# api
app = FastAPI()


@app.get(
    path="/tasks/",
    status_code=status.HTTP_200_OK,
    response_model=list[STask],
)
async def get_tasks():
    return tasks


@app.post(
    path="/tasks/",
    status_code=status.HTTP_201_CREATED,
    response_model=STask,
)
async def add_task(data: STaskCreate):
    new_task = {
        "uuid": str(uuid4()),
        "title": data.title,
        "completed": data.completed,
    }
    tasks.append(new_task)
    return new_task


@app.put(
    path="/tasks/{uuid}",
    status_code=status.HTTP_200_OK,
    response_model=STask,
)
async def update_task(uuid: str, data: STaskUpdate):
    for task in tasks:
        if task["uuid"] == uuid:
            task["title"] = data.title
            task["completed"] = data.completed
            return task

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Task not found",
    )


@app.delete(
    path="/tasks/{uuid}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def update_task(uuid: str):
    for task in tasks:
        print(task)
        if task["uuid"] == uuid:
            tasks.remove(task)
            return

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Task not found",
    )


# start app
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )
