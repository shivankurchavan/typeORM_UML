import { Project } from "ts-morph";

interface Field {
  name: string;
  type: string;
}

interface Relationship {
  type: string;
  target: string;
  field: string;
}

interface Entity {
  name: string;
  fields: Field[];
  relationships: Relationship[];
}

export function parseTypeORMEntities(directoryPath: string): Entity[] {
  const project = new Project();
  project.addSourceFilesAtPaths(`${directoryPath}/**/*.ts`);
  const sourceFiles = project.getSourceFiles();

  const entities: Entity[] = [];

  sourceFiles.forEach((sourceFile) => {
    const classes = sourceFile.getClasses();
    classes.forEach((cls) => {
      const entity: Entity = {
        name: cls.getName() || "Unknown",
        fields: [],
        relationships: [],
      };

      // Check if the class is a TypeORM entity
      const isEntity = cls.getDecorator("Entity");
      if (!isEntity) return;

      cls.getProperties().forEach((property) => {
        const field: Field = {
          name: property.getName(),
          type: property.getType().getText(),
        };

        const columnDecorator = property.getDecorator("Column");
        if (columnDecorator) {
          entity.fields.push(field);
        }

        const relationshipDecorators = ["OneToOne", "OneToMany", "ManyToOne", "ManyToMany"];
        relationshipDecorators.forEach((relation) => {
          const relationDecorator = property.getDecorator(relation);
          if (relationDecorator) {
            const target = relationDecorator.getArguments()[0]?.getText() || "Unknown";
            entity.relationships.push({
              type: relation,
              target : target.replace(/.*=>\s*/, ""),
              field: property.getName(),
            });
          }
        });
      });

      entities.push(entity);
    });
  });

  return entities;
}
