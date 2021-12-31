export interface actorCreationDTO{
  name: String;
  dateOfBirth?: Date;
  picture? : File;
  pictureURL? : string;
  biography? : string;
}

export interface actorMovieDTO {
  id: number;
  name: string;
  character: string;
  picture: string;
}