import { transform } from "typescript";
import { urlActors } from "../endpoints";
import EditEntity from "../Utils/EditEntity";
import { convertActorToFormData } from "../Utils/FormDataUtils";
import ActorForm from "./ActorForm";
import { actorCreationDTO, actorDTO } from "./actors.model";

export default function EditActor() {
  function transform(actor: actorDTO): actorCreationDTO {
    return {
      name: actor.name,
      pictureURL: actor.picture,
      biography: actor.biography,
      dateOfBirth: new Date(actor.dateOfBirth),
    };
  }
  return (
    <EditEntity<actorCreationDTO, actorDTO>
      url={urlActors}
      entityName="Actors"
      indexURL="/actors"
      transformFromData={convertActorToFormData}
      transform={transform}
    >
      {(entity, edit) => (
        <ActorForm
          model={entity}
          onSubmit={async (value) => {
            await edit(value);
          }}
        />
      )}
    </EditEntity>
  );
}
