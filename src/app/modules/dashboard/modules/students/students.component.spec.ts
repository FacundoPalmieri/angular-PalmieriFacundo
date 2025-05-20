import { TestBed } from '@angular/core/testing';
import { StudentsService } from './students.service';

describe('StudentsService', () => {
    let service: StudentsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StudentsService);
    });

    it('debería crearse correctamente', () => {
        expect(service).toBeTruthy();
    });

    it('debería retornar un estudiante por ID', (done) => {
        service.getStudentById(1).subscribe((student) => {
            expect(student).toEqual({ id: 1, name: 'Juan', lastName: 'Pérez' });
            done();
        });
    });

    it('debería retornar todos los estudiantes', (done) => {
        service.getStudents$().subscribe((students) => {
            expect(students.length).toBe(5);
            expect(students[0].name).toBe('Juan');
            done();
        });
    });
});
