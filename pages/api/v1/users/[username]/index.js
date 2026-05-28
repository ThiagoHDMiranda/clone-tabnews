import controller from "infra/controller";
import user from "models/user";
import { createRouter } from "next-connect";

const router = createRouter();
router.get(getHandler);
router.patch(patchHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const { username } = request.query;
  const userFound = await user.findOneByUsername(username);

  return response.status(200).json(userFound);
}

async function patchHandler(request, response) {
  const { username } = request.query;
  const userInputValues = request.body;
  const updatedUser = await user.update(username, userInputValues);
  return response.status(200).json(updatedUser);
}
